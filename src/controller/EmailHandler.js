const Email = require('../util/Email');
const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
    
    const { parentEmail, parentName, studentName, courseDate} = req.body;

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
            res.status(500).json({status: 0});
        }else{
            res.status(200).json({status: 1});
        }
    })
}

