"use client";

import { UserContext } from "@/contexts/UserContext";
import useUserCookie from "@/hooks/useUserCookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";


export default function Redirected_Login() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);
  const [userCookie, setUserCookie] = useUserCookie();

  useEffect(() => {
    setUser(undefined);
    setUserCookie(undefined);
    router.push("/login")
  }, []);

  return <div>
    Redirecting to login...
  </div>
};