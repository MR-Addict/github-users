import Client from "./Client";
import pageSession from "@/lib/auth";
import { getUsers, readLocalUsers } from "@/lib/github";
import { Logout, Login } from "@/components";
import { ClientContextProvider } from "./contexts";

export const revalidate = 0;

export default async function Home() {
  const session = await pageSession();
  if (!session?.accessToken) return <Login />;

  const token = session.accessToken;
  const users = await getUsers(token);
  // const users = readLocalUsers();

  return (
    <ClientContextProvider users={users}>
      <Client token={token} avatar={session.user?.image || ""} />
      <Logout />
    </ClientContextProvider>
  );
}
