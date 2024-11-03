import {resend} from "@/lib/resend";
import {ApiResponse} from "@/types/apiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifycode:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
          from:'',
          to:'',
          subject:'',
          react:VerificationEmail({username,otp:verifycode}),  
        })

        return {
            success: true,
            message: 'Verification email sent',

        }
    } catch (error) {
        return {
            success: false,
            message: 'Error sending verification email',
        }
        console.log("Error Sending Verification",error)
    }
}