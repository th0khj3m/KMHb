import nodemailer from "nodemailer";
import { CLIENT, OWNER } from "../config.js";

async function sendPasswordResetEmail(email, resetToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: OWNER.EMAIL, // Your Gmail email
        pass: OWNER.PASS, // Your Gmail password
      },
    });

    const mailOptions = {
      from: '"KMHb Support" <thokhiem142857@gmail.com>', // Sender display name and email
      to: email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
              font-size: 24px;
              color: #333;
            }
            .content {
              font-size: 16px;
              color: #666;
              line-height: 1.5;
            }
            .button {
              display: block;
              width: 200px;
              margin: 20px auto;
              padding: 10px;
              text-align: center;
              background-color: #5ec1a2;
              color: #000;
              text-decoration: none;
              border-radius: 5px;
            }
            .reset {
              color: #000;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Password Reset Request</h1>
            <p class="content">You are receiving this email because a password reset request has been made for your account. Please click the button below to reset your password:</p>
            <a href="${CLIENT.URL}/reset-password/${resetToken}" class="button"><span class = "reset">Reset Password</span></a>
            <p class="content">If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <p class="footer">Thank you,<br/>KMHb Support Team</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    // Return the response
    return { message: "Password reset email sent successfully" };
  } catch (err) {
    throw new Error("Error sending password reset email: " + err.message);
  }
}

export default sendPasswordResetEmail;
