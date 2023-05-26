"use client";

import Image from "next/image";
import { useMemo } from "react";
import { TbUsers } from "react-icons/tb";

import { formatNumber } from "@/lib/utils";
import { useClientContext } from "@/app/contexts";

export default function Avatar({ avatar }: { avatar: string }) {
  const { githubUsers } = useClientContext();
  const totalCount = useMemo(() => githubUsers.length, [githubUsers]);
  const followersCount = useMemo(() => githubUsers.filter((user) => user.follower).length, [githubUsers]);
  const followingCount = useMemo(() => githubUsers.filter((user) => user.following).length, [githubUsers]);

  return (
    <div className="flex flex-row gap-1 md:gap-2">
      <Image alt="avatar" width={100} height={100} src={avatar} className="w-6 h-6 md:w-7 md:h-7 rounded-full" />

      <div className="flex flex-row items-center whitespace-nowrap gap-0.5">
        <p className="text-gray-500">
          <TbUsers />
        </p>
        <p>
          {formatNumber(followersCount)} <span className="text-gray-500">followers</span>
        </p>
        <p>•</p>
        <p>
          {formatNumber(followingCount)} <span className="text-gray-500">following</span>
        </p>
        <p>•</p>
        <p>
          {formatNumber(totalCount)} <span className="text-gray-500">total</span>
        </p>
      </div>
    </div>
  );
}
