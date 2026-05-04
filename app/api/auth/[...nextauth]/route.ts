import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth/next"
import Google from "next-auth/providers/google"


export const authOptions: any = {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, account }: any) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: any) {
            // Send properties to the client
            session.accessToken = token.accessToken;
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async redirect({ url, baseUrl }: any): Promise<string> {
            // If the callback url is relative, make it absolute
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            // If it's an absolute URL and from the same base, return it
            else if (new URL(url).origin === baseUrl) {
                return url;
            }
            // Default redirect to create-form after signin
            return `${baseUrl}/create-form`;
        }
    }
}

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}