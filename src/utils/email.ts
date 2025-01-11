import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"No Reply" <dipo@softallaince.com>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendEmail;
