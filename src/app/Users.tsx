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
      <section className='w-full z-10 bg-white sticky top-0 text-sm flex flex-col'>
        <div className='px-4 md:px-48 py-5 shadow-sm w-full border-b flex flex-row items-center justify-between gap-1 border-gray-300'>
          <Image
            alt='avatar'
            width={100}
            height={100}
            src={avatar}
            className='hidden md:block w-6 h-6 md:w-8 md:h-8 rounded-full'
          />

          <div className='flex flex-row items-center flex-wrap gap-0.5'>
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
        </div>

        <div className='px-4 md:px-48 pt-3 md:pt-5 w-full flex flex-col md:flex-row gap-3'>
          <div className='w-full'>
            <input
              value={filter.searchWords}
              name='filter searchWords'
              placeholder='Search...'
              onChange={(e) => setFilter({ ...filter, searchWords: e.target.value.toLowerCase() })}
              className='w-full py-1.5 px-2 rounded-md border border-gray-500 outline-none focus:border-blue-600'
            />
          </div>

          <select
            value={filter.type}
            name='filter type'
            // @ts-expect-error
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className='border border-gray-500 py-1.5 px-2 outline-none rounded-md focus:border-blue-600'
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
        <table className='w-full'>
          <tbody className='flex flex-col'>
            {githubUsers.map((user) => (
              <UserCard token={token} user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
