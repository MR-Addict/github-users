import getFollowers from "./getFollowers";
import getFollowing from "./getFollowing";
import { GithubUserType, UserType } from "@/types/user";

function filterUsers(following: GithubUserType[], followers: GithubUserType[]) {
  const duplicateUsers = following.filter((item1) => followers.some((item2) => item2.id === item1.id));

  const followingButNotFollowers = following.filter((item1) => !duplicateUsers.some((item2) => item2.id === item1.id));
  const followersButNotFollowing = followers.filter((item1) => !duplicateUsers.some((item2) => item2.id === item1.id));

  return { followingButNotFollowers, followersButNotFollowing };
}

export default async function getUsers() {
  const [following, followers] = await Promise.all([getFollowing(), getFollowers()]);
  const { followingButNotFollowers, followersButNotFollowing } = filterUsers(following, followers);

  const uniqueUsers: GithubUserType[] = Array.from(
    new Set([...following, ...followers].map((obj) => JSON.stringify(obj)))
  ).map((obj) => JSON.parse(obj));

  return uniqueUsers.map((user) => {
    const follower = !followingButNotFollowers.some((item) => item.id === user.id);
    const following = !followersButNotFollowing.some((item) => item.id === user.id);
    return { ...user, follower, following };
  }) as UserType[];
}
