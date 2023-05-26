import z from "zod";

const Env = z.object({
  GITHUB_SECRET: z.string(),
  GITHUB_CLIENTID: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().optional()
});

const env = Env.parse(process.env);
export default env;
