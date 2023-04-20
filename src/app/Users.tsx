"use client";

import { useMemo, useState } from "react";

import { UserType } from "@/types/user";
import { UserCard } from "./components";

type FilterType = "all" | "following" | "followers" | "followingbutnotfollowers" | "followersbutnotfollowing";

function filterUsers(type: FilterType, users: UserType[]) {
  if (type === "followers") return users.filter((user) => user.follower);
  else if (type === "following") return users.filter((user) => user.following);
  else if (type === "followersbutnotfollowing") return users.filter((user) => !user.following && user.follower);
  else if (type === "followingbutnotfollowers") return users.filter((user) => user.following && !user.follower);
  else return users;
}

export default function Users({ token, users }: { token: string; users: UserType[] }) {
  const [filter, setFilter] = useState<FilterType>("all");

  const githubUsers = useMemo(() => filterUsers(filter, users), [users, filter]);
  const totalCount = useMemo(() => githubUsers.length, [githubUsers]);
  const followersCount = useMemo(() => githubUsers.filter((user) => user.follower).length, [githubUsers]);
  const followingCount = useMemo(() => githubUsers.filter((user) => user.following).length, [githubUsers]);

  return (
    <main className='pb-5 md:py-5 px-5 md:px-48 w-full flex flex-col gap-5'>
      <div className='z-10 bg-white py-4 border-b border-b-gray-300 w-full flex flex-col md:flex-row justify-between gap-1.5 md:gap-5 sticky top-0 text-sm'>
        <div className='flex flex-row gap-3'>
          <p>
            Total:<span className='text-blue-600'>{totalCount}</span>
          </p>
          <p>
            Following:<span className='text-blue-600'>{followingCount}</span>{" "}
          </p>
          <p>
            Followers:<span className='text-blue-600'>{followersCount}</span>{" "}
          </p>
        </div>

        <select
          value={filter}
          // @ts-expect-error
          onChange={(e) => setFilter(e.target.value)}
          className='border border-gray-300 py-1 md:py-0.5 px-2 outline-none rounded-md'
        >
          <option value='all'>All</option>
          <option value='following'>Following</option>
          <option value='followers'>Followers</option>
          <option value='followingbutnotfollowers'>Following But Not Followers</option>
          <option value='followersbutnotfollowing'>Followers But Not Following</option>
        </select>
      </div>

      <table>
        <tbody className='flex flex-col'>
          {githubUsers.map((user) => (
            <UserCard token={token} user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
