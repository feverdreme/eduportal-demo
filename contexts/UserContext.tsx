"use client";

import useUserCookie from "@/hooks/useUserCookie";
import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";


export const UserContext = createContext({ "user": undefined, "setUser": (newUser: User|undefined) => {} });

export const useSyncContextWithCookie = () => {
  const {user, setUser} = useContext(UserContext);
  const [userCookie, setUserCookie] = useUserCookie();

  setUser(userCookie);
}

export default function UserContextProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [user, setUser] = useState(undefined);

  return (
    <UserContext.Provider value={{
      user, setUser
    }}>
      {children}
    </UserContext.Provider>
  );
};