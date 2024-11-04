import nodemailer, { Transporter } from 'nodemailer';
import {ApiResponse} from "@/types/apiResponse";
const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});


const sendEmail = async (email:string,username:string,verifyCode:string): Promise<ApiResponse> => {
    
    const mailOptions = {
        from: 'Noctis', 
        to: email, 
        "subject": "Verify your email", 
     text: `Hello ${username}, please verify your email with the code: ${verifyCode}`
       
    };

    
try {
    
    await transporter.sendMail(mailOptions);
    return {
        success: true,
        message: 'Verification email sent',
    };
        
} catch (error) {
    console.error('Error sending verification email:', error);
    return {
        success: false,
        message: 'Error sending verification email_1',
    }
};

}


export default sendEmail;