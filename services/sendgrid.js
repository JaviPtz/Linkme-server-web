//sendgrid
const sgMail = require("@sendgrid/mail");
const config = require('../config')
//api key sendgrid

sgMail.setApiKey(config.SENGRID_API_KEY);

module.exports = sgMail;