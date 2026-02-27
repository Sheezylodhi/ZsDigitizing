import nodemailer from "nodemailer";

export async function sendCredentials(email, username, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Client Portal" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Client Portal Login",
    html: `
      <div style="font-family:sans-serif">
        <h2>Your Client Portal Account Created</h2>
        <p><b>Email:</b> ${username}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Login here:</p>
        <a href="${process.env.SITE_URL}/client-portal">
          ${process.env.SITE_URL}/client-portal
        </a>
      </div>
    `
  });
}
