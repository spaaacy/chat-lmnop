import { connectToDb } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user.js";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      try {
        await connectToDb();

        const existingUser = await User.findOne({ email: session.user.email });

        session.user.image = existingUser.image;
        console.log(session.user);
        return session;
      } catch (error) {
        console.log(error);
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDb();

        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
          await User.create({
            email: user.email,
            username: user.name.replace(" ", "").toLowerCase(),
            image: user.image ?? "/assets/icons/account.svg",
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
