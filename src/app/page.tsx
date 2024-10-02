"use client"
import { signOut, useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  
  if(!session){
  }
  return (
    <div className="container min-h-screen flex items-center justify-center">
      {session && <button onClick={()=> signOut({callbackUrl:"/sign-in"})}>logout</button>}
      {!session && <span>logged out</span>}
    </div>
  );
}
