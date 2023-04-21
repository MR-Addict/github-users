"use client";

import { useClientContext } from "./contexts";
import { UserCard, Avatar, Searchbar } from "./components";

export default function Client({ token, avatar }: { token: string; avatar: string }) {
  const { githubUsers } = useClientContext();

  return (
    <main className='w-full flex flex-col'>
      <section className='w-full px-4 md:px-48 py-5 shadow-sm z-10 border-b border-gray-300 bg-white sticky top-0 text-sm flex flex-col md:flex-row items-center justify-between gap-3'>
        <Avatar avatar={avatar} users={githubUsers} />
        <Searchbar />
      </section>

      <section className='w-full px-4 md:px-48 py-5'>
        <ul className='w-full flex flex-col'>
          {githubUsers.map((user) => (
            <UserCard token={token} user={user} key={user.id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
