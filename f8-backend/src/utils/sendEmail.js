// const nodemailer = require("nodemailer");
// // const handlebars = require("handlebars")

// const sendEmail = async (
//   handlebars,
//   subject,
//   send_to,
//   sent_from,
//   reply_to,
//   template,
//   name,
//   link
// ) => {

//   // Create Email Transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: 587,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
//   // console.log(transporter);

//   const renderTemplate = (templateName, context) => {
//     const compiledTemplate = handlebars.compile(templateName);
//     console.log(com)
//     return compiledTemplate(context);
//   };

//   // Options f0r sending email
//   const options = {
//     from: sent_from,
//     to: send_to,
//     replyTo: reply_to,
//     subject,
//     // template,
//     // context:{
//     //   name,link
//     // },
//     html: renderTemplate(template, { name, link }),
//   };

//   // Send Email
//   transporter.sendMail(options, function (err, info) {
//     if (err) {
//       console.log(err);
//       // reply.status(500).send('Failed to send email.');
//     } else {
//       console.log("success:"+info.response);
//       // reply.send('Email sent successfully!');
//     }
//   });
// };

// module.exports = sendEmail;
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmail = async (
  subject,
  send_to,
  sent_from,
  reply_to,
  template,
  name,
  link
) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlearOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./src/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlearOptions));

  // Options f0r sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject,
    template,
    context: {
      name,
      link,
    },
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

