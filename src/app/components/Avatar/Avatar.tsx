import Image from "next/image";
import { useMemo } from "react";
import { TbUsers } from "react-icons/tb";

import { UserType } from "@/types/user";
import { formatNumber } from "@/lib/utils";

export default function Avatar({ avatar, users }: { avatar: string; users: UserType[] }) {
  const totalCount = useMemo(() => users.length, [users]);
  const followersCount = useMemo(() => users.filter((user) => user.follower).length, [users]);
  const followingCount = useMemo(() => users.filter((user) => user.following).length, [users]);

  return (
    <div className='w-full flex flex-row gap-3'>
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
    </div>
  );
}
