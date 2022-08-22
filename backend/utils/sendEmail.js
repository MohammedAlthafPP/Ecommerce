const nodeMailter = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
var path = require("path");

const sendEmail = async (options) => {
  const transporter = nodeMailter.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: true,

    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    template: options.hbs,
    context: {
      email: options.email, // replace {{email}} with Adebola
      message: options.message, // replace {{message}} with My Company
      url: options.resetPasswordUrl,
    },
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
