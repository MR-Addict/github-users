import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import env from "@/types/env";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  jwt: { secret: env.NEXTAUTH_SECRET },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string };
        if (username === env.LOGIN_USERNAME && password === env.LOGIN_PASSWORD)
          return { id: username, name: username, email: username };
        else return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
