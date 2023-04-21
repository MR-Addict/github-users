"use client";

import classNames from "classnames";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

import style from "./Login.module.css";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className='w-full flex-1 flex flex-col items-center justify-center'>
      <button
        type='button'
        disabled={isSubmitting}
        className={classNames(style.btn, "gradient-bg")}
        onClick={() => {
          setIsSubmitting(true);
          signIn("github");
        }}
      >
        <AiFillGithub size={30} />
        <span>Login with Github</span>
      </button>
    </main>
  );
}
