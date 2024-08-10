import * as nodemailer from '../config/nodemailer.js';

export const worker_rating = (worker, hirer) => {
    let htmlString = nodemailer.renderTemplate({worker: worker, hirer: hirer}, '/hirer_rating.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: worker.email,
        subject: 'Rate the Hirer',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}