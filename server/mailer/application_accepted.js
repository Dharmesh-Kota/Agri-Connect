import * as nodemailer from '../config/nodemailer.js';

export const application_accepted = (worker, hirer, application) => {
    let htmlString = nodemailer.renderTemplate({worker: worker, hirer: hirer, application: application}, '/application_accepted.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: worker.email,
        subject: 'You are hired!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}