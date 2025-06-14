import { PrismaClient } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"    
import Google from "next-auth/providers/google"


export const authOptions : NextAuthOptions = {
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
    ],
    
    adapter:PrismaAdapter(prisma),
    session:{strategy:"jwt"}
}

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}