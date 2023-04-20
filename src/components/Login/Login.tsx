"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

export default function Login() {
  return (
    <main className='w-full flex-1 flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => signIn("github")}
        className='border border-gray-300 bg-gray-100 rounded-md flex flex-row items-center justify-center gap-3 py-2 px-6 hover:bg-[#ededee] duration-100'
      >
        <AiFillGithub size={30} />
        <span>Login with Github</span>
      </button>
    </main>
  );
}
