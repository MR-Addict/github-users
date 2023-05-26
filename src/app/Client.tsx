"use client";

import classNames from "classnames";
import { useMemo } from "react";

import { useClientContext } from "./contexts";
import { UserCard, Avatar, Searchbar } from "./components";

export default function Client({ token, avatar }: { token: string; avatar: string }) {
  const leftSide = 1;
  const buttonsWidth = 5;
  const usersPerPage = 30;
  const { githubUsers, currentPage, setCurrentPage } = useClientContext();

  const totalPages = useMemo(
    () => Math.ceil(githubUsers.length / usersPerPage),
    [currentPage, usersPerPage, githubUsers]
  );

  const currentUsers = useMemo(() => {
    const firstUserIndex = currentPage * usersPerPage;
    const lastUserIndex = firstUserIndex + usersPerPage;
    return githubUsers.slice(firstUserIndex, lastUserIndex);
  }, [githubUsers, usersPerPage, currentPage]);

  function Button({ page }: { page: number }) {
    return (
      <button
        type="button"
        onClick={() => {
          setCurrentPage(page);
          window.scroll({ top: 0, behavior: "auto" });
        }}
        className={classNames(
          { "text-white gradient-bg": page === currentPage },
          "w-7 h-7 place-items-center rounded-sm border border-gray-300"
        )}
      >
        {page + 1}
      </button>
    );
  }

  return (
    <main className="flex-1 w-full flex flex-col">
      <header className="w-full px-5 md:px-48 py-3 md:py-5 shadow-sm z-10 border-b border-gray-300 bg-white sticky top-0 text-sm flex flex-row items-center justify-between gap-3">
        <Avatar avatar={avatar} />
        <Searchbar />
      </header>

      <section
        aria-label="users body"
        className="flex-1 bg-gray-100 w-full flex flex-col items-center justify-between gap-10 px-5 md:px-48 pt-5 pb-10"
      >
        {/* got results */}
        {currentUsers.length > 0 && (
          <ul className="w-full flex flex-col">
            {currentUsers.map((user) => (
              <UserCard token={token} user={user} key={user.id} />
            ))}
          </ul>
        )}

        {/* no results */}
        {currentUsers.length === 0 && <h1 className="my-auto">No results</h1>}

        <section aria-label="pagination" className="flex flex-row items-center gap-1.5">
          {/* first button */}
          {currentUsers.length > 0 && <Button page={0} />}

          {/* dots */}
          {totalPages > buttonsWidth + 2 && currentPage - Math.floor(buttonsWidth / 2) > leftSide && (
            <div className="place-items-center">...</div>
          )}

          {/* other buttons */}
          {Array.from(Array(totalPages)).map((item, index) => {
            const rightSide = Math.max(totalPages - 1, leftSide);

            let pageBegin = leftSide;
            if (currentPage - leftSide > 2) pageBegin = Math.max(currentPage - Math.floor(buttonsWidth / 2), leftSide);
            let pageEnd = Math.min(pageBegin + buttonsWidth, rightSide);
            if (pageEnd - pageBegin < buttonsWidth) pageBegin = Math.max(pageEnd - buttonsWidth, leftSide);
            if (index >= pageBegin && index < pageEnd) return <Button key={index} page={index} />;
          })}

          {/* dots */}
          {totalPages > buttonsWidth + 2 && currentPage + Math.ceil(buttonsWidth / 2) < totalPages - 1 && (
            <div className="place-items-center">...</div>
          )}

          {/* last button show only page are more than one page */}
          {totalPages > 1 && <Button page={totalPages - 1} />}
        </section>
      </section>
    </main>
  );
}
