"use client";

import classNames from "classnames";
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

import style from "./ScrollToTop.module.css";

export default function ScrollToTop() {
  const [isVisiable, setIsVisiable] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) setIsVisiable(true);
      else setIsVisiable(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="scroll to top"
      onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
      className={classNames(isVisiable ? "scale-100" : "scale-0", "gradient-bg", style.btn)}
    >
      <IoIosArrowUp size={25} />
    </button>
  );
}
