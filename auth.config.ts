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
    signIn: async ({ account }) => {
      const { providerAccountId: id } = account || {};
      const userQuery = await db
        .select()
        .from(user)
        .where(eq(user.id, id || ""));
     if (!userQuery[0]) return false;
     return userQuery[0].isAdmin ?? false;
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
