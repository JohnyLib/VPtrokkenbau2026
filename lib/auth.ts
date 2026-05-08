const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyBuffer = encoder.encode(secret);
  return crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function base64UrlEncode(buffer: Uint8Array | ArrayBuffer): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = str.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Signs a payload and returns a HS256 JWT string.
 */
export async function signJWT(payload: Record<string, any>, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const headerEncoded = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadEncoded = base64UrlEncode(encoder.encode(JSON.stringify({
    ...payload,
    exp: payload.exp || Math.floor(Date.now() / 1000) + (60 * 60 * 24), // Default 24 hours
  })));
  
  const signatureInput = `${headerEncoded}.${payloadEncoded}`;
  const cryptoKey = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(signatureInput)
  );
  const signatureEncoded = base64UrlEncode(signatureBuffer);
  
  return `${signatureInput}.${signatureEncoded}`;
}

/**
 * Verifies a JWT token using HS256 and returns the parsed payload, or null if invalid/expired.
 */
export async function verifyJWT(token: string, secret: string): Promise<Record<string, any> | null> {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
    const signatureInput = `${headerEncoded}.${payloadEncoded}`;
    
    const cryptoKey = await getCryptoKey(secret);
    const signatureBuffer = base64UrlDecode(signatureEncoded);
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureBuffer.buffer as ArrayBuffer,
      encoder.encode(signatureInput)
    );
    
    if (!isValid) return null;
    
    const payloadBytes = base64UrlDecode(payloadEncoded);
    const payloadStr = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(payloadStr);
    
    // Check expiration
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      console.warn('JWT session is expired');
      return null;
    }
    
    return payload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}
