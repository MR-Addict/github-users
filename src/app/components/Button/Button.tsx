"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UserType } from "@/types/user";
import { LoadingDots } from "@/components";
import { usePopupContext } from "@/contexts";

export default function Button({ token, user }: { token: string; user: UserType }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClick() {
    setIsSubmitting(true);

    fetch(`https://api.github.com/user/following/${user.login}`, {
      method: user.following ? "DELETE" : "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((res) => {
        if (res.status === 204) {
          router.refresh();
          popup({ status: true, message: `Success to ${user.following ? "unfollow" : "follow"} ${user.login}` });
        } else popup({ status: false, message: `Failed to ${user.following ? "unfollow" : "follow"} ${user.login}` });
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: `Failed to ${user.following ? "unfollow" : "follow"} ${user.login}` });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={isSubmitting}
      className='text-[12px] disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 duration-100 h-7 w-16 rounded-md border border-gray-300 flex items-center justify-center'
    >
      {isSubmitting && <LoadingDots />}
      {!isSubmitting && <span>{user.following ? "Unfollow" : "Follow"}</span>}
    </button>
  );
}
