const nodemailer = require('nodemailer')

async function sendEmail(body) {
  const { userEmail, userName, userText } = body

  let transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'roman.girich@meta.ua', // generated ethereal user
      pass: 'Kg43v0096', // generated ethereal password
    },
  })
  const emailLetterText = `<p>Ви отримали Email від ${userEmail}</p>
    <p>текст листа ${userText}</p>
    <p>автор листа ${userName}</p>`

  const mailOptions = {
    from: 'roman.girich@meta.ua', // sender address
    to: 'roman.girich@gmail.com', // list of receivers
    subject: 'Ви отримали спадщину від дідуся', // Subject line
    text: 'регулювання питань спадщини', // plain text body
    html: emailLetterText, // html body}
  }

  let info = await transporter.sendMail(mailOptions)

  console.log('Message sent: %s', info.messageId)
  return true
}

module.exports = sendEmail
