import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    // Credentials with fallback
    const gmailUser = process.env.GMAIL_USER || 'sulemanzaheer09@gmail.com';
    const rawPass = process.env.GMAIL_APP_PASSWORD || 'wtpe psug ocrm arbp';
    const gmailPass = rawPass.replace(/\s+/g, ''); // strip spaces
    const adminRecipient = process.env.GMAIL_TO || 'sulemanzaheer09@gmail.com';

    // Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 1. Notification Email for Suleman Zaheer (Admin)
    const adminMailOptions = {
      from: `"Suleman Zaheer Portfolio" <${gmailUser}>`,
      to: adminRecipient,
      replyTo: email,
      subject: `⚡ New Project Inquiry from ${name}: "${subject || 'New Inquiry'}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; margin: 0; padding: 24px; }
            .container { max-width: 620px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px 28px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 8px 0 0; color: #e2e8f0; font-size: 14px; }
            .content { padding: 32px 28px; }
            .badge { display: inline-block; background: rgba(59, 130, 246, 0.2); border: 1px solid #3b82f6; color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px; }
            .field-row { margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #1e293b; }
            .field-label { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .field-value { font-size: 16px; color: #ffffff; font-weight: 500; word-break: break-word; }
            .message-box { background: #0b0f19; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-top: 10px; font-size: 15px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
            .actions { text-align: center; margin-top: 28px; }
            .btn { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(37,99,235,0.4); }
            .footer { background: #0b0f19; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Client Form Submission</h1>
              <p>Direct lead from suleman-zaheer.vercel.app</p>
            </div>
            <div class="content">
              <span class="badge">Immediate Lead Alert</span>
              
              <div class="field-row">
                <div class="field-label">Client Name</div>
                <div class="field-value">${name}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Client Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></div>
              </div>

              <div class="field-row">
                <div class="field-label">Subject / Service Needed</div>
                <div class="field-value">${subject || 'Not specified'}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Submission Date & Time (PKT)</div>
                <div class="field-value">${formattedDate}</div>
              </div>

              <div class="field-row" style="border-bottom: none;">
                <div class="field-label">Project Details / Message</div>
                <div class="message-box">${message}</div>
              </div>

              <div class="actions">
                <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject || 'Your Inquiry')}" class="btn">Reply to ${name}</a>
              </div>
            </div>
            <div class="footer">
              Suleman Zaheer Portfolio Notification System • Automated & Secure
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 2. Automated Confirmation Email for the Client
    const clientMailOptions = {
      from: `"Suleman Zaheer" <${gmailUser}>`,
      to: email,
      replyTo: gmailUser,
      subject: `Thank you for reaching out, ${name}! | Suleman Zaheer`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; margin: 0; padding: 24px; }
            .container { max-width: 620px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 36px 28px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 8px 0 0; color: #93c5fd; font-size: 15px; }
            .content { padding: 32px 28px; }
            .salutation { font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 16px; }
            .lead-text { font-size: 15px; line-height: 1.7; color: #cbd5e1; margin-bottom: 24px; }
            .summary-box { background: #0b0f19; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
            .summary-title { font-size: 13px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
            .summary-item { font-size: 14px; color: #e2e8f0; margin-bottom: 8px; line-height: 1.5; }
            .summary-item strong { color: #94a3b8; }
            .contact-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
            .card { background: #1e293b; border-radius: 10px; padding: 16px; text-align: center; text-decoration: none; color: #f1f5f9; }
            .card strong { display: block; font-size: 14px; margin-bottom: 4px; color: #60a5fa; }
            .card span { font-size: 13px; color: #cbd5e1; }
            .footer { background: #0b0f19; padding: 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; line-height: 1.6; }
            .footer a { color: #60a5fa; text-decoration: none; margin: 0 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Message Received!</h1>
              <p>Suleman Zaheer — Full Stack, Desktop & Automation Engineer</p>
            </div>
            <div class="content">
              <div class="salutation">Hello ${name},</div>
              <div class="lead-text">
                Thank you for reaching out! I have received your message regarding <strong>${subject || 'your project inquiry'}</strong>.
                <br><br>
                I personally review every inquiry and proposal. You can expect a detailed response with timeline, scope analysis, and technical recommendations within <strong>12 to 24 hours</strong>.
              </div>

              <div class="summary-box">
                <div class="summary-title">Your Submitted Inquiry Summary</div>
                <div class="summary-item"><strong>Subject:</strong> ${subject || 'General Inquiry'}</div>
                <div class="summary-item"><strong>Date:</strong> ${formattedDate}</div>
                <div class="summary-item"><strong>Your Message:</strong></div>
                <div style="color: #cbd5e1; font-style: italic; margin-top: 6px; padding-left: 10px; border-left: 2px solid #3b82f6;">"${message}"</div>
              </div>

              <div class="lead-text">
                Need urgent assistance or want to jump straight onto a call? Feel free to reach out directly via WhatsApp:
              </div>

              <div style="text-align: center; margin: 24px 0;">
                <a href="https://wa.me/923285778715?text=${encodeURIComponent(`Hi Suleman, I just submitted an inquiry on your website regarding "${subject || 'a project'}".`)}" style="display: inline-block; background: #25D366; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px;">
                  💬 Chat on WhatsApp (+92 328 5778715)
                </a>
              </div>
            </div>

            <div class="footer">
              <strong>Suleman Zaheer — Business Growth Partner & Software Engineer</strong><br>
              Web Apps (Next.js/MERN) • Mobile Apps (Flutter) • Desktop Apps (Electron) • Python Automations<br>
              Shahdara Town, Lahore, Pakistan<br><br>
              <a href="https://suleman-zaheer.vercel.app">Portfolio</a> |
              <a href="https://github.com/imsuleman-10">GitHub</a> |
              <a href="https://www.linkedin.com/in/suleman-zaheer-mughal">LinkedIn</a> |
              <a href="mailto:sulemanzaheer09@gmail.com">sulemanzaheer09@gmail.com</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails in parallel
    const [adminResult, clientResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    if (adminResult.status === 'rejected') {
      console.error('Failed to send admin notification email:', adminResult.reason);
      throw new Error(`Admin email failure: ${adminResult.reason?.message || adminResult.reason}`);
    }

    if (clientResult.status === 'rejected') {
      console.warn('Failed to send client confirmation email:', clientResult.reason);
    }

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully to both admin and client.',
    });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to dispatch emails. Please try again.',
      },
      { status: 500 }
    );
  }
}
