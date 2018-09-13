'use strict'

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId
const sgMail = require('@sendgrid/mail')     

module.exports = {
    sendRegistrationEmailConfirmation: _sendRegistrationEmailConfirmation,
}

function _sendRegistrationEmailConfirmation(email) {
    let body = _formRegistrationEmailBody(email)
    let subject = `Message Notification from ${email.senderName}`

    return _sendEmail(email.toEmail, {email: email.senderEmail}, subject, body.text, body.html)
}

function _formRegistrationEmailBody(email) {
    let url = `www.bettyjxchen.com/admin/messages/${email.id}`

    let body = {

        text:        
        `You have a message from: ${email.senderName} (${email.senderEmail})
        Message: 
        ${email.message}
        
        Click this link to see message.
        ${url}`,

        html: 
        `<tr>
        <td>
        <p class="m-b-5" style="margin: 0;margin-bottom: 5px !important;color: black !important;font-family: Helvetica, Arial, sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 19px;font-size: 13px;">
        You have a message from: ${email.senderName} (${email.senderEmail})
        <br>
        "${email.message}"
        </p>
        </td>
        </tr>
        <td>
        <p class="m-b-5" style="margin: 0;margin-bottom: 5px !important;color: #a8acb1 !important;font-family: Helvetica, Arial, sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 19px;font-size: 12px;">
        View message here: ${url}
        <br>
        If the link does not work, you can copy/paste it into your browser's address bar.
        </p>
        </td>
        </tr>`
    }
    return body
}

function _sendEmail(toEmail, senderEmail, subject, text, html) {
    let email = {
        to: toEmail,
        from: senderEmail,
        bcc: process.env.SENDGRID_BCC_EMAIL,
        subject: subject,
        text: text,
        html: html,
        // templateId: process.env.SENDGRID_TEMPLATE,
        // substitutions: { "senderName": senderName }
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    sgMail.setSubstitutionWrappers('==', '==')
    return sgMail.send(email)
        .catch(err => console.log(err.toString()))
}



