import Users from "./Users";
import pageSession from "@/lib/auth";
import { getUsers, readLocalUsers } from "@/lib/github";
import { Logout, Login } from "@/components";

export const revalidate = 0;

export default async function Home() {
  const session = await pageSession();
  if (!session) return <Login />;

  const users = await getUsers(session.accessToken);
  // const users = readLocalUsers();
  return (
    <>
      <Users token={session.accessToken} users={users} />
      {session && <Logout />}
    </>
  );
}
