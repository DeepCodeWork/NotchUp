const nodemailer = require('nodemailer');
require('dotenv').config();

// {receiverMail, parentName, studentName, courseName, slot}
const sendMail = ({parentEmail, parentName, studentName, courseDate}) => {

    console.log(process.env.SENDER_MAIL)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_PASSWORD
        }
    })
    
    let mailOptions = {
        from: process.env.SENDER_MAIL,
        to : parentEmail,
        subject: 'NotchUp Trial Class Booked successfully',
        text: `Dear ${parentName} 
        ${studentName}'s class at ${courseDate} has been successfully booked.`
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(err)
            return 0;
        }else{
            console.log("yes")
             return 1;
        }
    })
}

module.exports =  sendMail;