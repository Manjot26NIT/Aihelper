import mongoose , {Schema , Document } from "mongoose";

export interface Message extends Document {
content: string;
createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
content: { type: String, required: true },
createdAt: { type: Date, 
    default: Date.now ,
    required: true },
});

export interface User extends Document {
username: string;
email: string;
password: string;
verifycode:string;
verifyCodeExpiry:Date;
isAcceptingMessage:boolean;
messages: Message[];
isVerified:boolean;
}

const userSchema: Schema<User> = new Schema({
username: { type: String, required: true,
    trim:true,unique:true },
email: { type: String, required: [true, 'Email is required'],
    trim:true,unique:true,match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
password: { type: String, required: true },
verifycode:{type:String,required:true},
verifyCodeExpiry:{type:Date,required:true},
isAcceptingMessage:{type:Boolean,required:true},            
isVerified:{type:Boolean,required:true,default:false},
messages: [messageSchema],
})

const userModel=(mongoose.models.User as mongoose.
Model<User>|| mongoose.model<User>('User', userSchema));

export default userModel;
