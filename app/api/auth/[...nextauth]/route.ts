import { PrismaClient } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"    
import Google from "next-auth/providers/google"


export const authOptions : NextAuthOptions = {
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    scope: [
                        'https://www.googleapis.com/auth/userinfo.email',
                        'https://www.googleapis.com/auth/userinfo.profile',
                        'https://www.googleapis.com/auth/forms.body',
                        'https://www.googleapis.com/auth/drive.file'
                    ].join(' ')
                }
            }
        }),
    ],
    pages: {
        signIn:"/signin"
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    
    callbacks: {
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            session.accessToken = token.accessToken;
            return session;
        },
    }
}

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}