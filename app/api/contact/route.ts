import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, formType } = body;

    const typeLabel = formType === 'career' ? 'Karriere-Bewerbung' : (formType === 'callback' ? 'Rückrufanforderung' : 'Kontaktanfrage');

    console.log(`[Form Submission - ${typeLabel}]`, { name, email, phone, service, message });

    // Save to Supabase contact_submissions table
    try {
      const { error: dbError } = await supabaseAdmin
        .from('contact_submissions')
        .insert([
          {
            name: name || 'Nicht angegeben',
            email: email || 'Nicht angegeben',
            phone: phone || null,
            service: service || null,
            message: message || null,
            form_type: formType || 'contact',
            status: 'new'
          }
        ]);
      
      if (dbError) {
        console.error('Error saving submission to Supabase:', dbError);
      } else {
        console.log('Successfully saved submission to Supabase');
      }
    } catch (dbErr) {
      console.error('Exception while saving submission to Supabase:', dbErr);
    }

    // HTML Email template
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #091426; border-radius: 4px;">
        <div style="background-color: #091426; color: #ffffff; padding: 15px; text-align: center; font-weight: bold; font-size: 20px; text-transform: uppercase; margin-bottom: 20px;">
          Vp<span style="color: #fd761a;">Trockenbau</span> - ${typeLabel}
        </div>
        <p style="font-size: 16px; color: #45474c;">Sie haben eine neue Nachricht über das Online-Formular erhalten:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #eae7e9;">
            <td style="padding: 10px; font-weight: bold; width: 120px; color: #091426;">Name/Firma:</td>
            <td style="padding: 10px; color: #45474c;">${name || 'Nicht angegeben'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eae7e9;">
            <td style="padding: 10px; font-weight: bold; color: #091426;">E-Mail:</td>
            <td style="padding: 10px; color: #45474c;">${email || 'Nicht angegeben'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eae7e9;">
            <td style="padding: 10px; font-weight: bold; color: #091426;">Telefon:</td>
            <td style="padding: 10px; color: #45474c;">${phone || 'Nicht angegeben'}</td>
          </tr>
          ${service ? `
          <tr style="border-bottom: 1px solid #eae7e9;">
            <td style="padding: 10px; font-weight: bold; color: #091426;">Gewerk:</td>
            <td style="padding: 10px; color: #45474c;">${service}</td>
          </tr>
          ` : ''}
        </table>
        
        <div style="background-color: #f5f3f4; padding: 15px; border-left: 4px solid #fd761a; margin-top: 15px; border-radius: 2px;">
          <strong style="display: block; margin-bottom: 8px; color: #091426;">Nachricht:</strong>
          <p style="margin: 0; color: #45474c; white-space: pre-wrap; line-height: 1.5;">${message || 'Keine Nachricht hinterlassen.'}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 11px; color: #999999; text-align: center; border-top: 1px solid #eae7e9; padding-top: 15px;">
          Diese E-Mail wurde automatisch vom Web-Kontaktformular auf vptrokenbau.de generiert.
        </div>
      </div>
    `;

    const textContent = `
      VpTrockenbau - ${typeLabel}
      --------------------------------------------------
      Name/Firma: ${name || 'Nicht angegeben'}
      E-Mail: ${email || 'Nicht angegeben'}
      Telefon: ${phone || 'Nicht angegeben'}
      ${service ? `Gewerk: ${service}` : ''}
      --------------------------------------------------
      Nachricht:
      ${message || 'Keine Nachricht hinterlassen.'}
    `;

    // Send the email if SMTP configuration is present
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER_EMAIL } = process.env;

    const receivers = CONTACT_RECEIVER_EMAIL || 'info@vptrokenbau.de, perevalovvasilii@gmail.com';

    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name || 'Web Form'}" <${SMTP_USER}>`,
        replyTo: email || undefined,
        to: receivers,
        subject: `[VpTrockenbau] ${typeLabel} von ${name || 'Kontaktformular'}`,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({ success: true, method: 'smtp' });
    } else {
      console.log('SMTP environment variables are missing. Simulating successful form submission.');
      return NextResponse.json({ success: true, method: 'simulated' });
    }
  } catch (error: any) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
