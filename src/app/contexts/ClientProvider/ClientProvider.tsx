"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { UserType } from "@/types/user";

interface ClientContextProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  rawUsers: UserType[];
  githubUsers: UserType[];
  setGithubUsers: (value: UserType[]) => void;
}

const ClientContext = createContext<ClientContextProps>({
  currentPage: 0,
  setCurrentPage(value: number) {},
  rawUsers: [],
  githubUsers: [],
  setGithubUsers(value: UserType[]) {},
});

interface ClientContextProviderProps {
  children: React.ReactNode;
  users: UserType[];
}

export const ClientContextProvider = ({ children, users }: ClientContextProviderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [githubUsers, setGithubUsers] = useState(users);

  useEffect(() => setGithubUsers(users), [users]);

  return (
    <ClientContext.Provider value={{ currentPage, setCurrentPage, rawUsers: users, githubUsers, setGithubUsers }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
