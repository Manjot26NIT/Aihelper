// its important that we check email and username separately


// i will tell you how it briefly works
// firstly this is a sign up form
// it will take username, email, password
// it checks if the username already exists
// if it does you get a false

// then it sees if the email already exists

import dbConnect from "@/lib/dbConnect";
 import userModel from "@/model/User";
 import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
 import bcrypt from "bcryptjs";
 import { ApiResponse } from "@/types/apiResponse";
 export async function POST(request:Request){
    await dbConnect();
    try {
        const {username,email,password}=await request.json();
        const existingUserVerifiedByUsername =await userModel.findOne({
            username,
            isVerified:true
        })

        if(existingUserVerifiedByUsername){
            return Response.json( {
                success:false,
                message:'Username already exists'
            },{status:400})
        }
    const existingUserByEmail =await userModel.findOne({
        email
    })
        
    if

    } catch (error) {
        return Response.json({})
    }
}