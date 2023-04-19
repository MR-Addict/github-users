import Users from "./Users";
import env from "@/types/env";
import pageSession from "@/lib/auth";
import { Login } from "./components";
import { Logout } from "@/components";
import { getUsers } from "@/lib/github";

export const revalidate = 0;

export default async function Home() {
  const session = await pageSession();
  if (!session) return <Login />;

  const users = await getUsers();
  return (
    <>
      <Users token={env.GITHUB_TOKEN} users={users} />
      {session && <Logout />}
    </>
  );
}
