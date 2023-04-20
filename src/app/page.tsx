import Users from "./Users";
import pageSession from "@/lib/auth";
import { getUsers } from "@/lib/github";
import { Logout, Login } from "@/components";

export const revalidate = 0;

export default async function Home() {
  const session = await pageSession();
  if (!session?.accessToken) return <Login />;

  const users = await getUsers(session.accessToken);
  return (
    <>
      <Users token={session.accessToken} users={users} />
      {session && <Logout />}
    </>
  );
}
