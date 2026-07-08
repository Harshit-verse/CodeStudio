import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getAccountByUserId, getUserById } from "@/features/auth/actions";

//import NextAuth from "next-auth"

//import authConfig from "./auth.config"

export const { auth, handlers, signIn, signOut } = NextAuth({
 // adapter: PrismaAdapter(db),
  callbacks: {
   /* async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      return token;
    },  */

    async jwt({ token }) {
  if (!token.email) return token;

  const dbUser = await db.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (dbUser) {
    token.sub = dbUser.id;      // MongoDB User ID
    token.role = dbUser.role;
    token.picture = dbUser.image;
    token.name = dbUser.name;
  }

  return token;
},

    async session({ session, token }) {
      // Attach the user ID from the token to the session
    if(token.sub  && session.user){
      session.user.id = token.sub
    } 

    if(token.sub && session.user){
      session.user.role = token.role
    }

    return session;
    },
  },
  
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
})
