"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className='w-full flex-1 flex flex-col items-center justify-center'>
      <button
        type='button'
        disabled={isSubmitting}
        onClick={() => {
          setIsSubmitting(true);
          signIn("github");
        }}
        className='border border-gray-300 bg-gray-100 rounded-md flex flex-row items-center justify-between gap-3 py-2 px-6 hover:bg-[#ededee] duration-100 disabled:cursor-not-allowed'
      >
        <AiFillGithub size={30} />
        <span>Login with Github</span>
      </button>
    </main>
  );
}
