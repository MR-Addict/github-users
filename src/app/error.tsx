"use client";

import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);

  return (
    <main aria-label="error page" className="w-full flex-1 flex flex-col items-center justify-center gap-3">
      <button
        type="button"
        aria-label="reset button"
        onClick={() => location.reload()}
        className="text-blue-600 shadow-md duration-300 hover:shadow-xl rounded-full"
      >
        <IoMdRefresh size={40} />
      </button>
      <p>Something went wrong!</p>
    </main>
  );
}
