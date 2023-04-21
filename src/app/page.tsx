import Client from "./Client";
import pageSession from "@/lib/auth";
import { Login } from "@/components";
import { getUsers } from "@/lib/github";
import { ClientContextProvider } from "./contexts";

export const revalidate = 0;

export default async function Home() {
  const session = await pageSession();
  if (!session?.accessToken) return <Login />;

  const token = session.accessToken;
  const users = await getUsers(token);

  return (
    <ClientContextProvider users={users}>
      <Client token={token} avatar={session.user?.image || ""} />
    </ClientContextProvider>
  );
}
