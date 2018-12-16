const nodemailer = require('nodemailer');

const from = '"Bookworm" <info@bookworm.com>';

function setup() {
  return nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "054d29891dc155",
			pass: "c678785d6391d5"
		}
	});
}

module.exports.sendConfirmationEmail = function sendConfirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Bookworm",
    text: `
    Welcome to Bookworm. Please, confirm your email.
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