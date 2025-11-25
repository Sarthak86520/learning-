import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';



const  sendEmail = async (options) => {
const mailGenerator  = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',  
            link: 'https://taskmanagerlink.com/'
}}) 

const emailTextual =  mailGenerator.generatePlaintext()(options.mailgenContent);
const emailHTML =  mailGenerator.generate(options.mailgenContent);

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
    }
})

const mail ={
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML
}
try{
    await transporter.sendMail(mail);
}catch(error){
    console.error("Email service failed silently. Make sure that yo have provided your MAILTRAP credentials in the .env file");
    console.error("Error: ", error);
}
}


const emailVerificationMailgenContent = (username, verificationUrl) => {
    return{
        body: {
            name: username,
            intro: 'Welcome! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with your account, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we're always happy to help."
        },
    }:
};
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return{
        body: {
            name: username,
            intro: 'We got a request to reset your password.',
            action: {
                instructions: 'To reset your password, please click here:',
                button: {
                    color: '#60e980', // Optional action button color
                    text: 'Reset your password',
                    link: passwordResetUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we're always happy to help."
        },
    }:
};

export{
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}