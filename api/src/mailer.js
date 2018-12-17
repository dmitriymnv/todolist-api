const nodemailer = require('nodemailer');

const from = '"Bookworm" <info@bookworm.com>';

function setup() {
  return nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "ff3cd1e4c2ff5a",
			pass: "6cdab0a9dd3366"
		}
	})
}

module.exports.sendConfirmationEmail = function sendConfirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Добро пожаловать на TodoList",
    text: `
    Добро пожаловать на TodoList. Пожалуйста подтвердите вашу почту.
    ${user.generateConfirmationUrl()}
    `
  };

  tranport.sendMail(email);
}

module.exports.sendResetPasswordEmail = function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset password follow this link
    ${user.generateResetPasswordLink()}
    `
  };

  tranport.sendMail(email);
}