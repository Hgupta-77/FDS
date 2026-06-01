const nodemailer = require("nodemailer");

const sendFraudAlertEmail = async (
  to,
  subject,
  text
) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT:", info.response);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendFraudAlertEmail;