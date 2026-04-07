import nodemailer from "nodemailer";

export async function sendCredentials(email, username, password) {
  const transporter = nodemailer.createTransport({
    // 'service: gmail' ko delete kar dein
    host: process.env.SMTP_HOST, // smtp.hostinger.com
    port: Number(process.env.SMTP_PORT), // 465
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Client Portal" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Client Portal Login",
      html: `
        <div style="font-family:sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #0e2c1c;">Your Client Portal Account Created</h2>
          <p>Hello,</p>
          <p>Your account has been successfully created. Use the following credentials to login:</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <p style="margin: 5px 0;"><b>Email / Username:</b> ${username}</p>
            <p style="margin: 5px 0;"><b>Password:</b> ${password}</p>
          </div>
          <p>Login here:</p>
          <a href="${process.env.SITE_URL}/client-portal" style="background: #0e2c1c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Access Client Portal
          </a>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            Note: For security reasons, please change your password after your first login.
          </p>
        </div>
      `
    });
    console.log("Credentials email sent to:", email);
  } catch (error) {
    console.error("Error sending credentials email:", error);
  }
}