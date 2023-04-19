"use client";

import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

export default function Logout() {
  return (
    <button
      type='button'
      aria-label='logout'
      onClick={() => signOut()}
      className='fixed bottom-10 right-5 md:right-10 shadow-md w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center'
    >
      <MdLogout size={19} />
    </button>
  );
}
