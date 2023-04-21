"use client";

import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { AiOutlineMail, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import FollowButton from "./FollowButton";
import style from "./UserCard.module.css";
import { UserType } from "@/types/user";
import { Tooltip } from "@/components";

export default function UserCard({ token, user }: { token: string; user: UserType }) {
  return (
    <li className='border-b border-gray-300 flex flex-col md:flex-row justify-between gap-1 md:gap-5 py-5'>
      <div className='w-full md:w-fit flex flex-row items-center justify-between gap-2'>
        <div className='w-16 h-fit rounded-full'>
          <Image
            src={user.avatarUrl}
            alt={user.login}
            width={100}
            height={100}
            className='rounded-full border border-gray-300'
          />
        </div>

        <div className='md:hidden flex flex-row items-center gap-1'>
          {user.follower ? <AiFillHeart fill='#db2777' /> : <AiOutlineHeart />}
          <FollowButton token={token} user={user} />
        </div>
      </div>

      <div className='w-full flex flex-col items-start justify-between gap-1 md:gap-2'>
        <div className='flex flex-row gap-1 flex-wrap'>
          {user.name && <h1>{user.name}</h1>}
          {user.name && <p>•</p>}
          <a href={user.url} target='_blank' className='text-blue-600 hover:underline'>
            {user.login}
          </a>
        </div>

        {(user.company || user.location || user.email) && (
          <div className='flex flex-row md:gap-2 flex-wrap'>
            {user.email && (
              <div className={style["icon-chip"]}>
                <AiOutlineMail />
                <p>{user.email}</p>
              </div>
            )}

            {user.company && (
              <div className={style["icon-chip"]}>
                <HiOutlineBuildingOffice />
                <p>{user.company}</p>
              </div>
            )}

            {user.location && (
              <div className={style["icon-chip"]}>
                <GoLocation size={13} />
                <p>{user.location}</p>
              </div>
            )}
          </div>
        )}

        {user.bio && <p className='text-gray-500 text-sm'>{user.bio}</p>}
      </div>

      <div className='hidden md:flex flex-col items-center justify-center gap-1'>
        {user.follower ? (
          <Tooltip title={`${user.login} is following you`}>
            <AiFillHeart fill='#db2777' />
          </Tooltip>
        ) : (
          <Tooltip title={`${user.login} isn't following you`}>
            <AiOutlineHeart />
          </Tooltip>
        )}

        <FollowButton token={token} user={user} />
      </div>
    </li>
  );
}
