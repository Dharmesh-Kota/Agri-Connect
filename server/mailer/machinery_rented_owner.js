import * as nodemailer from '../config/nodemailer.js';

export const machinery_rented_owner = (owner, user, application, quantity) => {
    let htmlString = nodemailer.renderTemplate({owner: owner, user: user, application: application, quantity: quantity}, '/machinery_rented.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: owner.email,
        subject: 'Your machine has been rented!!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}