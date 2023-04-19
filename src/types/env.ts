import z from "zod";

const Env = z.object({
  GITHUB_TOKEN: z.string(),
});

const env = Env.parse(process.env);
export default env;
