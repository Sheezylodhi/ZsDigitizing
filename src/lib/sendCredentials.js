import nodemailer from "nodemailer";

export async function sendCredentials(email, username, password) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // 1. Client ko email bhejna (Jo aapne pehle banayi thi)
    await transporter.sendMail({
      from: `"ZS Digitizing" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Client Portal Access Details",
      html: `
        <div style="font-family:sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  
  <h2 style="color: #0e2c1c;">Welcome to ZS Digitizing</h2>

  <p>Hello,</p>

  <p>
    Welcome to ZS Digitizing.<br><br>
    We are pleased to inform you that your client portal account has been successfully created.
  </p>

  <p>
    You can now access your account using the login details provided below:
  </p>

  <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 10px 0;">
    <p style="margin: 5px 0;"><b>Email / Username:</b> ${username}</p>
    <p style="margin: 5px 0;"><b>Password:</b> ${password}</p>
  </div>

  <p>
    You can log in to your client portal using the link below:
  </p>

  <a href="${process.env.SITE_URL}/client-portal" 
     style="background: #0e2c1c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
    Access Client Portal
  </a>

  <p style="margin-top:20px;">
    If you need any assistance or have any questions, please feel free to contact us at any time. 
    Our team is always here to help.
  </p>

  <p>
    We look forward to working with you.
  </p>

  <p>
    Best regards,
  </p>

  <p style="font-size: 12px; color: #666; margin-top: 20px;">
    Note: For security reasons, please change your password after your first login.
  </p>

  <!-- Footer (UNCHANGED) -->
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #555;">
  
  <div style="display: flex; align-items: center;">
    
    <!-- Logo Circle -->
    <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; margin-right: 15px; border: 1px solid #eee; flex-shrink: 0;">
  <img 
    src="https://www.zsdigitizing.com/Logoicon.png" 
    alt="ZS Digitizing"
    width="60"
    height="60"
    style="display: block; width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
</div>

    <!-- Content -->
    <div>
      <div><b>ZS Digitizing</b></div>
      <div style="font-size: 13px; color: #777;">Client Support Team</div>

      <div style="margin: 5px 0;">
        <a href="mailto:Info@zsdigitizing.com" style="color: #0e2c1c; text-decoration: none;">
          Info@zsdigitizing.com
        </a> | 
        <a href="https://www.zsdigitizing.com" style="color: #0e2c1c; text-decoration: none;">
          www.zsdigitizing.com
        </a>
      </div>

      <div style="font-size: 12px; color: #888;">
        Embroidery Digitizing | Vector Art | Custom Patches
      </div>
    </div>

  </div>

</div>
</div>
      `// Yahan aapka wahi purana HTML template rahega
    });

    // 2. Admin ko alert email bhejna
    await transporter.sendMail({
      from: `"System Alert" <${process.env.SMTP_USER}>`,
      to: "info@zsdigitizing.com", // Admin ki email
      subject: "🔔 New Client Registered Successfully",
      html: `
        <div style="font-family: sans-serif; border: 2px solid #0e2c1c; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0e2c1c;">New Client Account Details</h2>
          <p>A new client account has been created on the system. Details are given below:</p>
          <ul style="list-style: none; padding: 0;">
            <li><b>Client Email:</b> ${email}</li>
            <li><b>Username:</b> ${username}</li>
            <li><b>Password:</b> ${password}</li>
          </ul>
          <p style="color: #666; font-size: 12px;">This email is only for admin alert.</p>
        </div>
      `
    });

    console.log("Credentials sent to client and admin notification triggered.");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}