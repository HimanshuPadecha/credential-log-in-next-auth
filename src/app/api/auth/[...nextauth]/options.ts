import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import {User} from "@/models/User"
import { connectDb } from "@/db/connectDb";


export const options:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any> {

                await connectDb()

                try {
                    const user = await User.findOne({username:credentials.username})

                    if(!user){
                        throw new Error("No user exist on this email")
                    }

                    const isPassCorrect = await bcrypt.compare(credentials.password,user.password)

                    if(!isPassCorrect){
                        throw new Error("Invalid password")
                    }

                    return user
                } catch (error) {
                    console.log(error);
                    throw new Error("error while logging you in")
                    
                    
                }
              }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/sign-in",
        signOut:"/sign-out",
        error:"/sign-in-error"
    },
    callbacks:{
        async jwt({ token, user }) {
            if (user) {
              token.username = user.username;
            }
            return token;
          },
          async session({ session, token }) {
            if(token){
                session.user.username = token.username;
            }
            return session;
          },
    }
}