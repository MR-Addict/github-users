import Users from "./Users";
import env from "@/types/env";
import { getUsers } from "@/lib/github";

export const revalidate = 0;

export default async function Home() {
  const users = await getUsers();

  return <Users token={env.GITHUB_TOKEN} users={users} />;
}
