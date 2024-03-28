import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    signIn: async ({ profile }) => {
      const { email } = profile || {};
      const userQuery = await db
        .select()
        .from(user)
        .where(eq(user.email, email || ""));
      return userQuery[0].isAdmin;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};
export default authConfig;
