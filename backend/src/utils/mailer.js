import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!process.env.MAIL_HOST) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  return transporter;
};

export const sendMail = async ({ subject, html }) => {
  const t = getTransporter();
  if (!t) {
    console.log(`[Mailer] MAIL_HOST not configured — skipping email: "${subject}"`);
    return { skipped: true };
  }

  try {
    await t.sendMail({
      from: `"BIG BOYS 18+" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || "kabilanssj@gmail.com",
      subject,
      html,
    });
    return { skipped: false };
  } catch (err) {
    console.error(`[Mailer] Failed to send email: ${err.message}`);
    return { skipped: true, error: err.message };
  }
};
