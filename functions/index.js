const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Read credentials from Firebase functions config: `firebase functions:config:set email.user="..." email.pass="..."`
const EMAIL_USER = functions.config().email && functions.config().email.user;
const EMAIL_PASS = functions.config().email && functions.config().email.pass;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('Email Function ready to send emails');
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: `"${name}" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0ea5e9;">New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    };

    const autoReplyOptions = {
      from: `"Suleman Zaheer" <${EMAIL_USER}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0ea5e9;">Hi ${name},</h2>
          <p>Thank you for contacting me through my portfolio website. I have received your inquiry regarding <strong>"${subject}"</strong>.</p>
          <p>I typically respond within 24 hours. Looking forward to discussing this further!</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Suleman Zaheer</strong><br />MERN Stack Developer</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions).catch(e => console.error('Auto-reply failed:', e));

    res.status(200).json({ success: true, message: 'Emails dispatched successfully' });
  } catch (error) {
    console.error('Email Dispatch Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin-reply', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: `"Suleman Zaheer" <${EMAIL_USER}>`,
      to: email,
      subject: `Re: Your inquiry, ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #0ea5e9; border-radius: 12px;">
          <h2 style="color: #0ea5e9;">Hello ${name},</h2>
          <p style="font-size: 16px; line-height: 1.6;">${message}</p>
          <br />
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p>Best Regards,</p>
          <p><strong>Suleman Zaheer</strong><br />MERN Stack Developer</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Reply sent successfully' });
  } catch (error) {
    console.error('Reply Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.api = functions.https.onRequest(app);
