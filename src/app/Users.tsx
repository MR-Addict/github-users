"use client";

import Image from "next/image";
import { TbUsers } from "react-icons/tb";
import { useMemo, useState } from "react";

import { UserType } from "@/types/user";
import { UserCard } from "./components";
import { formatNumber } from "@/lib/utils";

interface FilterType {
  type: "all" | "following" | "followers" | "followingbutnotfollowers" | "followersbutnotfollowing";
  searchWords: string;
}

function filterUsers(filter: FilterType, users: UserType[]) {
  let newUsers = [...users];
  if (filter.type === "followers") newUsers = users.filter((user) => user.follower);
  else if (filter.type === "following") newUsers = users.filter((user) => user.following);
  else if (filter.type === "followersbutnotfollowing")
    newUsers = users.filter((user) => !user.following && user.follower);
  else if (filter.type === "followingbutnotfollowers")
    newUsers = users.filter((user) => user.following && !user.follower);

  type KeyType = "login" | "name" | "email" | "bio" | "company" | "location";
  const keys: KeyType[] = ["login", "name", "email", "bio", "company", "location"];
  newUsers = newUsers.filter((user) => keys.some((key) => user[key]?.toLowerCase().includes(filter.searchWords)));

  return newUsers;
}

export default function Users({ token, avatar, users }: { token: string; avatar: string; users: UserType[] }) {
  const [filter, setFilter] = useState<FilterType>({ type: "all", searchWords: "" });

  const githubUsers = useMemo(() => filterUsers(filter, users), [users, filter]);
  const totalCount = useMemo(() => githubUsers.length, [githubUsers]);
  const followersCount = useMemo(() => githubUsers.filter((user) => user.follower).length, [githubUsers]);
  const followingCount = useMemo(() => githubUsers.filter((user) => user.following).length, [githubUsers]);

  return (
    <main className='w-full flex flex-col'>
      <section className='w-full px-4 md:px-48 py-5 shadow-sm z-10 border-b border-gray-300 bg-white sticky top-0 text-sm flex flex-col md:flex-row items-center justify-between gap-3'>
        <Image
          alt='avatar'
          width={100}
          height={100}
          src={avatar}
          className='hidden md:block w-6 h-6 md:w-8 md:h-8 rounded-full'
        />

        <div className='flex flex-row items-center whitespace-nowrap gap-0.5'>
          <p className='text-gray-500'>
            <TbUsers />
          </p>
          <p>
            {formatNumber(followersCount)} <span className='text-gray-500'>followers</span>
          </p>
          <p>•</p>
          <p>
            {formatNumber(followingCount)} <span className='text-gray-500'>following</span>
          </p>
          <p>•</p>
          <p>
            {formatNumber(totalCount)} <span className='text-gray-500'>total</span>
          </p>
        </div>

        <div className='w-full flex flex-col md:flex-row justify-end gap-3'>
          <div className='w-full flex flex-row justify-end'>
            <input
              value={filter.searchWords}
              name='filter searchWords'
              placeholder='Search...'
              onChange={(e) => setFilter({ ...filter, searchWords: e.target.value.toLowerCase() })}
              className='w-full md:max-w-xs py-1 px-2 rounded-md border border-gray-500 outline-none focus:border-blue-600'
            />
          </div>

          <select
            value={filter.type}
            name='filter type'
            // @ts-expect-error
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className='border border-gray-500 py-1 px-2 outline-none rounded-md focus:border-blue-600'
          >
            <option value='all'>All</option>
            <option value='following'>Following</option>
            <option value='followers'>Followers</option>
            <option value='followingbutnotfollowers'>Following But Not Followers</option>
            <option value='followersbutnotfollowing'>Followers But Not Following</option>
          </select>
        </div>
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
