"use client";

import { useMemo, useState } from "react";

import { UserType } from "@/types/user";
import { UserCard } from "./components";

type Types = "all" | "following" | "followers" | "followingbutnotfollowers" | "followersbutnotfollowing";

interface FilterType {
  type: Types;
}

function filterUsers(type: Types, users: UserType[]) {
  if (type === "followers") return users.filter((user) => user.follower);
  else if (type === "following") return users.filter((user) => user.following);
  else if (type === "followersbutnotfollowing") return users.filter((user) => !user.following && user.follower);
  else if (type === "followingbutnotfollowers") return users.filter((user) => user.following && !user.follower);
  else return users;
}

export default function Users({ token, users }: { token: string; users: UserType[] }) {
  const [filter, setFilter] = useState<FilterType>({ type: "all" });

  const githubUsers = useMemo(() => filterUsers(filter.type, users), [users, filter]);
  const totalCount = useMemo(() => githubUsers.length, [githubUsers]);
  const followersCount = useMemo(() => githubUsers.filter((user) => user.follower).length, [githubUsers]);
  const followingCount = useMemo(() => githubUsers.filter((user) => user.following).length, [githubUsers]);

  return (
    <main className='pb-5 md:py-5 px-5 md:px-48 w-full flex flex-col gap-12'>
      <div className='bg-white py-5 border-b border-b-gray-300 w-full flex flex-col md:flex-row justify-between gap-1 md:gap-5 sticky top-0 text-sm'>
        <div className='flex flex-row gap-3'>
          <p>Total:{totalCount}</p>
          <p>Following:{followingCount}</p>
          <p>Followers:{followersCount}</p>
        </div>

        <select
          value={filter.type}
          // @ts-expect-error
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className='border border-gray-300 py-0.5 px-2 outline-none rounded-md'
        >
          <option value='all'>All</option>
          <option value='following'>Following</option>
          <option value='followers'>Followers</option>
          <option value='followingbutnotfollowers'>Following But Not Followers</option>
          <option value='followersbutnotfollowing'>Followers But Not Following</option>
        </select>
      </div>

      <ul className='flex flex-col gap-7'>
        {githubUsers.map((user) => (
          <UserCard token={token} user={user} key={user.id} />
        ))}
      </ul>
    </main>
  );
}
