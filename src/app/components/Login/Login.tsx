"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main className='w-full flex-1 flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => signIn()}
        className='border border-gray-300 bg-gray-100 rounded-md py-1.5 px-6 hover:bg-gray-200 duration-100'
      >
        Login
      </button>
    </main>
  );
}
