import axios from "@/app/_utils/GlobalApi";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";

const authoptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        }),
        
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
              const user =  {email:credentials.email};
              return user
          }
        })
    ],
    callbacks:{
        async signIn({user,account}){
            if (account.provider === 'google') {
                const { name, email, image } = user;
                try {
                  const response = await axios.post('registrationGoogle.php', { name, email, image });
                  if (response.data.status && response.data.status==='success'){
                    return true;
                  }
                } catch (error) {
                  console.log(error);
                  return false;
                }
              }
              if (account.provider === "credentials") {
                return true;
              }
        
              return false;
        
        },
       
      },
      secret: process.env.NEXTAUTH_SECRET,
    };
    
    const handler = NextAuth(authoptions);
    
    export { handler as GET, handler as POST };