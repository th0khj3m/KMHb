import nodemailer from "nodemailer";

async function sendPasswordResetEmail(email, resetToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "thokhiem142857@gmail.com", // Your Gmail email
        pass: "rlqw fmpp xmbq rtjd", // Your Gmail password
      },
    });

    // Send mail with defined transport object
    const mailOptions = await transporter.sendMail({
      from: '"KMHb" <thokhiem142857@gmail.com>',
      to: email,
      subject: "Password Reset Request",
      html: `
          <p>You are receiving this email because a password reset request has been made for your account.</p>
          <p>Please click the following link to reset your password:</p>
          <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">${process.env.CLIENT_URL}/reset-password/${resetToken}</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `,
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to send email for password reset" });
      }
      console.log("Email sent: " + info.response);
      return res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    });
  } catch (err) {
    throw new Error("Error sending password reset email: " + err.message);
  }
}

export default sendPasswordResetEmail;
