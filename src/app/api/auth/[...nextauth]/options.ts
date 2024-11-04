import {NextAuthOptions} from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import userModel from '@/model/User'


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            credentials:{
                username:{label:"Username",type:"text",placeholder:"Username"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try {
                    const user= await userModel.findOne({
                        $or:[
                            {username:credentials.identifier},
                            {email:credentials.identifier}
                        ]


                    })

                    if(!user){
                        throw new Error("No user found")
                    }

                    if(!user.isVerified){
                        throw new Error("User not verified")
                    }

                    const valid= await bcrypt.compare(credentials.password,user.password)
                    if(!valid){
                        throw new Error("Password is incorrect")
                    }
                    else{
                        return user
                    }
                } catch (error:any) {
                    throw new Error(error.message)
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
            if (user) {
              token._id = user._id;
              token.isVerified = user.isVerified;
              token.isAcceptingMessage = user.isAcceptingMessage;
                token.username = user.username;
            }
            return token;
          },

          async session({ session, token }) {
            if (token) {
              session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessage;
                session.user.username = token.username;
            }
            return session;}
},
session:{
    strategy:"jwt",
},
secret: process.env.NEXTAUTH_SECRET,
pages:{
    signIn:'/sign-in'
}
}