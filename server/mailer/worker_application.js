import * as nodemailer from '../config/nodemailer.js';

export const worker_application = (worker, hirer, application) => {
    let htmlString = nodemailer.renderTemplate({worker: worker, hirer: hirer, application: application}, '/worker_application.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: hirer.email,
        subject: 'Someone applied to your job',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}