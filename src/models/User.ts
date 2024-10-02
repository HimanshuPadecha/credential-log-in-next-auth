import mongoose,{Document,Schema} from "mongoose";


export interface User extends Document{
    email:string,
    username:string,
    password:string,
    createdAt:Date,
    updatedAt:Date
}

const userSchema: Schema<User> = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },

},{
    timestamps:true
})

export const User = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",userSchema))