import mongoose from "mongoose";

interface connectionObj {
    isConnected?:number
}

const connection:connectionObj = {}

export const connectDb = async ()=>{

    try {
        if(connection.isConnected){
            console.log("The db is already connected");
            return 
        }

        const response = await mongoose.connect(`${process.env.DATABASE_URL}/practice`)

        if(response){
            connection.isConnected = response.connections[0].readyState
            console.log("The database is connnected successfully");
        }
    } catch (error) {
        console.log("Error while connecting the database",error);
        process.exit(1)
    }
}