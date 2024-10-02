import {User} from "@/models/User"
import bcrypt from "bcryptjs"
import { connectDb } from "@/db/connectDb";

export async function POST(requset:Request){
    await connectDb()

    try {
        const {username,email,password} = await requset.json()

        const ifAlreadyExist = await User.findOne({email})

        if(ifAlreadyExist){
            return Response.json({
                success:false,
                message:"The email address is already exist"
            },{status:404})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            email,
            password:hashedPassword,
            username
        })

        await user.save()

        return Response.json({
            success:true,
            message:"The user is successfully registered"
        })
    } catch (error) {
        console.log("error while registering user",error);
        return Response.json({
            success:false,
            message:"error while registring user"
        },{status:500})
    }
}