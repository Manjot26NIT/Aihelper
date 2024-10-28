// its a good thing ki iski utility 
// sirf ek hi file me hai, 
//aur kisi aur file me nahi hai
import { Resend } from "resend";
export const resend = new Resend(process.env.SENDGRID_API_KEY);
