"use client";

import { createContext, useContext, useState } from "react";

import { UserType } from "@/types/user";

interface ClientContextProps {
  rawUsers: UserType[];
  githubUsers: UserType[];
  setGithubUsers: (value: UserType[]) => void;
}

const ClientContext = createContext<ClientContextProps>({
  rawUsers: [],
  githubUsers: [],
  setGithubUsers(value: UserType[]) {},
});

interface ClientContextProviderProps {
  children: React.ReactNode;
  users: UserType[];
}

export const ClientContextProvider = ({ children, users }: ClientContextProviderProps) => {
  const [githubUsers, setGithubUsers] = useState(users);
  return (
    <ClientContext.Provider value={{ rawUsers: users, githubUsers, setGithubUsers }}>{children}</ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
