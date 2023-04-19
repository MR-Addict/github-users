import z from "zod";

const Env = z.object({
  GITHUB_TOKEN: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  LOGIN_USERNAME: z.string(),
  LOGIN_PASSWORD: z.string(),
});

const env = Env.parse(process.env);
export default env;
