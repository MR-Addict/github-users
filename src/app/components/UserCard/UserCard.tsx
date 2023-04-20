import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { AiOutlineMail, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import Button from "../Button/Button";
import style from "./UserCard.module.css";
import { UserType } from "@/types/user";
import { Tooltip } from "@/components";

export default function UserCard({ token, user }: { token: string; user: UserType }) {
  return (
    <tr className='border-b border-gray-300 flex flex-col md:flex-row justify-between py-4'>
      <td className='w-16 h-fit rounded-full mr-2 md:mr-5'>
        <Image
          src={user.avatarUrl}
          alt={user.login}
          width={100}
          height={100}
          className='rounded-full border border-gray-300'
        />
      </td>

      <td className='w-full flex flex-col items-start justify-between gap-1 md:gap-2'>
        <div className='flex flex-row gap-1 flex-wrap'>
          {user.name && <h1>{user.name}</h1>}
          {user.name && <p>•</p>}
          <a href={user.url} target='_blank' className='text-blue-600 hover:underline'>
            {user.login}
          </a>
        </div>

        {user.bio && <p className='text-gray-500 text-sm'>{user.bio}</p>}

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

        <div className='md:hidden flex flex-row items-center gap-1'>
          {user.follower ? <AiFillHeart fill='rgb(219 39 119)' /> : <AiOutlineHeart />}

          <Button token={token} user={user} />
        </div>
      </td>

      <td className='hidden md:flex flex-col items-center justify-center gap-1'>
        {user.follower ? (
          <Tooltip title={`${user.login} is following you`}>
            <AiFillHeart fill='rgb(219 39 119)' />
          </Tooltip>
        ) : (
          <Tooltip title={`${user.login} isn't following you`}>
            <AiOutlineHeart />
          </Tooltip>
        )}

        <Button token={token} user={user} />
      </td>
    </tr>
  );
}
