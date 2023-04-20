"use client";

import { TbUsers } from "react-icons/tb";
import { useMemo, useState } from "react";

import { UserType } from "@/types/user";
import { UserCard } from "./components";

interface FilterType {
  type: "all" | "following" | "followers" | "followingbutnotfollowers" | "followersbutnotfollowing";
  keywords: string;
}

function filterUsers(filter: FilterType, users: UserType[]) {
  let backupUesrs = [...users];
  if (filter.type === "followers") backupUesrs = users.filter((user) => user.follower);
  else if (filter.type === "following") backupUesrs = users.filter((user) => user.following);
  else if (filter.type === "followersbutnotfollowing")
    backupUesrs = users.filter((user) => !user.following && user.follower);
  else if (filter.type === "followingbutnotfollowers")
    backupUesrs = users.filter((user) => user.following && !user.follower);

  type KeyType = "login" | "name" | "email" | "bio" | "company" | "location";
  const keys: KeyType[] = ["login", "name", "email", "bio", "company", "location"];
  backupUesrs = backupUesrs.filter((user) => keys.some((key) => user[key]?.toLowerCase().includes(filter.keywords)));

  return backupUesrs;
}

export default function Users({ token, users }: { token: string; users: UserType[] }) {
  const [filter, setFilter] = useState<FilterType>({ type: "all", keywords: "" });

  const githubUsers = useMemo(() => filterUsers(filter, users), [users, filter]);
  const followersCount = useMemo(() => githubUsers.filter((user) => user.follower).length, [githubUsers]);
  const followingCount = useMemo(() => githubUsers.filter((user) => user.following).length, [githubUsers]);

  return (
    <main className='px-5 md:px-48 w-full flex flex-col'>
      <div className='z-10 bg-white py-5 sticky top-0 text-sm w-full flex flex-col gap-1.5 items-end'>
        <div className='flex flex-row items-center gap-0.5'>
          <p className='text-gray-500'>
            <TbUsers />
          </p>
          <p>
            {followersCount} <span className='text-gray-500'>followers</span>
          </p>
          <p>•</p>
          <p>
            {followingCount} <span className='text-gray-500'>following</span>
          </p>
        </div>

        <div className='w-full flex flex-col md:flex-row gap-1 md:gap-3'>
          <div className='w-full'>
            <input
              value={filter.keywords}
              name='filter keywords'
              placeholder='Search...'
              onChange={(e) => setFilter({ ...filter, keywords: e.target.value })}
              className='w-full py-1 px-2 rounded-md border border-gray-300 outline-none focus:border-blue-600'
            />
          </div>

          <select
            value={filter.type}
            name='filter type'
            // @ts-expect-error
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className='border border-gray-300 py-1 md:py-0.5 px-2 outline-none rounded-md focus:border-blue-600'
          >
            <option value='all'>All</option>
            <option value='following'>Following</option>
            <option value='followers'>Followers</option>
            <option value='followingbutnotfollowers'>Following But Not Followers</option>
            <option value='followersbutnotfollowing'>Followers But Not Following</option>
          </select>
        </div>
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
