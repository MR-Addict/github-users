"use client";

import { useState, useEffect } from "react";

import { UserType } from "@/types/user";
import { useClientContext } from "@/app/contexts";

type FilterType = "all" | "following" | "followers" | "followingbutnotfollowers" | "followersbutnotfollowing";

function filterUsers(users: UserType[], filter: FilterType) {
  if (filter === "following") return users.filter((user) => user.following);
  else if (filter === "followersbutnotfollowing") return users.filter((user) => !user.following && user.follower);
  else if (filter === "followingbutnotfollowers") return users.filter((user) => user.following && !user.follower);
  return users.filter((user) => user.follower);
}

function searchUsers(users: UserType[], searchKeywords: string) {
  type KeyType = "login" | "name" | "email" | "bio" | "company" | "location";
  const keys: KeyType[] = ["login", "name", "email", "bio", "company", "location"];
  return users.filter((user) => keys.some((key) => user[key]?.toLowerCase().includes(searchKeywords)));
}

export default function Searchbar() {
  const { rawUsers, setGithubUsers } = useClientContext();
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchKeywords, setSearchKeywords] = useState("");

  useEffect(() => setGithubUsers(filterUsers(rawUsers, filter)), [filter]);

  useEffect(() => {
    const timer = setTimeout(() => setGithubUsers(searchUsers(filterUsers(rawUsers, filter), searchKeywords)), 500);
    return () => clearTimeout(timer);
  }, [searchKeywords]);

  return (
    <div className='w-full flex flex-col md:flex-row justify-end gap-3'>
      <div className='w-full flex flex-row justify-end'>
        <input
          value={searchKeywords}
          placeholder='Search...'
          name='filter searchKeywords'
          onChange={(e) => setSearchKeywords(e.target.value)}
          className='w-full md:max-w-xs py-1 px-2 rounded-md border border-gray-500 outline-none focus:border-blue-600'
        />
      </div>

      <select
        value={filter}
        name='filter type'
        // @ts-expect-error
        onChange={(e) => setFilter(e.target.value)}
        className='border border-gray-500 py-1 px-2 outline-none rounded-md focus:border-blue-600'
      >
        <option value='all'>All</option>
        <option value='following'>Following</option>
        <option value='followers'>Followers</option>
        <option value='followersbutnotfollowing'>Followers But Not Following</option>
        <option value='followingbutnotfollowers'>Following But Not Followers</option>
      </select>
    </div>
  );
}
