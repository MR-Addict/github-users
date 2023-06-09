"use client";

import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import style from "./Searchbar.module.css";
import { UserType } from "@/types/user";
import { useClientContext } from "@/app/contexts";

export type FilterType = "all" | "following" | "followers" | "followingbutnotfollowers" | "followersbutnotfollowing";

function filterUsers(users: UserType[], filter: FilterType) {
  if (filter === "following") return users.filter((user) => user.following);
  else if (filter === "followers") return users.filter((user) => user.follower);
  else if (filter === "followersbutnotfollowing") return users.filter((user) => !user.following && user.follower);
  else if (filter === "followingbutnotfollowers") return users.filter((user) => user.following && !user.follower);
  return users;
}

function searchUsers(users: UserType[], searchKeywords: string) {
  type KeyType = "login" | "name" | "email" | "bio" | "company" | "location";
  const keys: KeyType[] = ["login", "name", "email", "bio", "company", "location"];
  return users.filter((user) => keys.some((key) => user[key]?.toLowerCase().includes(searchKeywords)));
}

export default function Searchbar() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchKeywords, setSearchKeywords] = useState("");
  const { rawUsers, setGithubUsers, setCurrentPage } = useClientContext();

  useEffect(() => {
    setCurrentPage(0);
    setGithubUsers(searchUsers(filterUsers(rawUsers, filter), searchKeywords));
  }, [filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(0);
      setGithubUsers(searchUsers(filterUsers(rawUsers, filter), searchKeywords));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeywords]);

  useEffect(() => {
    setFilter("all");
    setSearchKeywords("");
  }, [rawUsers]);

  return (
    <section aria-label="menu" className="w-full">
      <button type="button" aria-label="menu button" className={style["menu-btn"]}>
        <BsThreeDotsVertical />
      </button>

      <div className={style.frame}>
        <div className="w-full flex flex-row justify-end">
          <input
            value={searchKeywords}
            placeholder="Search..."
            name="filter searchKeywords"
            onChange={(e) => setSearchKeywords(e.target.value.toLowerCase())}
            className="w-full md:max-w-xs py-1 px-2 rounded-md border border-gray-500 outline-none focus:border-blue-600"
          />
        </div>

        <select
          value={filter}
          name="filter type"
          // @ts-expect-error
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-500 py-1 px-2 outline-none rounded-md focus:border-blue-600"
        >
          <option value="all">All</option>
          <option value="following">Following</option>
          <option value="followers">Followers</option>
          <option value="followersbutnotfollowing">Followers But Not Following</option>
          <option value="followingbutnotfollowers">Following But Not Followers</option>
        </select>
      </div>
    </section>
  );
}
