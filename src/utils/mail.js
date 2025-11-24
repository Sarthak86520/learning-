import Mailgen from 'mailgen';

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
    forgotPasswordMailgenContent
}