import nodemailer from "nodemailer";
import { CLIENT } from "../config.js";

console.log(CLIENT.URL);

async function sendPasswordResetEmail(email, resetToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "thokhiem142857@gmail.com", // Your Gmail email
        pass: "rlqw fmpp xmbq rtjd", // Your Gmail password
      },
    });

    const mailOptions = {
      from: "KMHb <thokhiem142857@gmail.com>",
      to: email,
      subject: "Password Reset Request",
      html: `
          <p>You are receiving this email because a password reset request has been made for your account.</p>
          <p>Please click the following link to reset your password:</p>
          <a href="${CLIENT.URL}/reset-password/${resetToken}">${CLIENT.URL}/reset-password/${resetToken}</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    // Log the response
    console.log("Email sent: " + info.response);

    // Return the response
    return { message: "Password reset email sent successfully" };
  } catch (err) {
    throw new Error("Error sending password reset email: " + err.message);
  }
}

export default sendPasswordResetEmail;
