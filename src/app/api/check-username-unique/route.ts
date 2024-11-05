import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import z from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { use } from "react";

const usernameUniqueSchema = z.object({
    username: usernameValidation,
})

export async function GET(request:Request){
    await dbConnect();
    try {
        const {searchParams}=new URL(request.url);
        const queryparams={
            username:searchParams.get('username')
        }
       
        const result=await usernameUniqueSchema.safeParse(queryparams);
       
        if (!result.success){
            console.log("check username unique error",result.error);
            return Response.json({
                success:false,
                message:'Invalid username'
            },{status:400})
        }
        
        

        const {username}=result.data;
        console.log("username",username);
        const existingUser=await UserModel.findOne({username,isVerified:true});
        if (existingUser){
            return Response.json({
                success:false,
                message:'Username already taken'
            },{status:400})
        }

        return Response.json({
            success:true,
            message:'Username is unique'
        })

    } catch (error) {
        
        console.log("check username unique error",error);
        return Response.json({
            success:false,
            message:'Error checking username'
        },{status:500})

    }
}