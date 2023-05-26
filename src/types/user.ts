import z from "zod";

const GithubUser = z.object({
  id: z.string(),
  url: z.string(),
  login: z.string(),
  avatarUrl: z.string(),
  name: z.union([z.string(), z.null()]).optional(),
  email: z.union([z.string(), z.null()]).optional(),
  bio: z.union([z.string(), z.null()]).optional(),
  location: z.union([z.string(), z.null()]).optional(),
  company: z.union([z.string(), z.null()]).optional()
});

const User = GithubUser.merge(
  z.object({
    follower: z.boolean(),
    following: z.boolean()
  })
);

type UserType = z.TypeOf<typeof User>;
type GithubUserType = z.TypeOf<typeof GithubUser>;

export { GithubUser };
export type { UserType, GithubUserType };
