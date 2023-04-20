import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import env from "@/types/env";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  jwt: { secret: env.NEXTAUTH_SECRET },

  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENTID,
      clientSecret: env.GITHUB_SECRET,
      authorization: { params: { scope: "user:follow" } },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
