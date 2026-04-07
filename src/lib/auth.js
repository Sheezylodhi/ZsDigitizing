import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "./models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // Check user in DB
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // Check password
        const isValid = bcrypt.compareSync(credentials.password, user.passwordHash);
        if (!isValid) return null;

        // Return user object
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // e.g., "admin" or "client"
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login", // admin login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
