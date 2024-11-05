import userModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
      const {username,code}=await request.json();
      const decodedusername=decodeURIComponent(username);
      const existingUser=await userModel.findOne({username:decodedusername});
      if(!existingUser){
          return Response.json({success:false,message:"User not found"},{status:400});
      }

      const isCodeValid=existingUser.verifyCode===code
      const isCodeNotExpired=existingUser.verifyCodeExpiry>new Date();

      if(isCodeValid && isCodeNotExpired){
          existingUser.isVerified=true;
          await existingUser.save();
          return Response.json({success:true,message:"User verified successfully"});
      }
      else if(!isCodeNotExpired){
          return Response.json({success:false,message:"Code has expired"},{status:400});
      }
      else{
          return Response.json({success:false,message:"Invalid code"},{status:400});
      }
  } catch (error) {
    console.error(error);
    return Response.json({success:false,message:"Internal server error"},{status:500});
  }
    
}