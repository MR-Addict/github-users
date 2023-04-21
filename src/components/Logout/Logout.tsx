"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

export default function Logout() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <button
      type='button'
      aria-label='logout'
      disabled={isSubmitting}
      onClick={() => {
        setIsSubmitting(true);
        signOut();
      }}
      className='fixed bottom-8 right-5 md:right-10 shadow-md w-10 h-10 gradient-bg text-white rounded-full flex items-center justify-center disabled:cursor-not-allowed'
    >
      <MdLogout size={19} />
    </button>
  );
}
