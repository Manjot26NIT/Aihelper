import mongoose from "mongoose";
import { number } from "zod";
// well what can we say , this is an edge time framework
type connectionObject = {
    isConnected ?: number
}

const connection :connectionObject = {}
 
async function dbConnect():Promise<void>{
 if(connection.isConnected){
        console.log('Using existing connection')        
    }

    try {
        const db=await mongoose.connect(process.env.MONGODB_URI||'',{})
        connection.isConnected=db.connections[0].readyState
    } catch (error) {
        console.log('Error connecting to database')
        console.log(error)   
        process.exit(1)    
    }

}

export default dbConnect