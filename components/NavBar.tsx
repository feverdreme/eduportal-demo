"use client";

import { UserContext, useSyncContextWithCookie } from "@/contexts/UserContext";
import getUserData from "@/firebase/database/getUserData";
import signOutUser from "@/firebase/database/signOutUser";
import useUserCookie from "@/hooks/useUserCookie";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [userData, setUserData] = useState<DocumentData|undefined>();
  const {user, setUser} = useContext(UserContext)
  const [userCookie, setUserCookie] = useUserCookie();

  useEffect(() => {
    setUser(userCookie);
  }, []);

  useEffect(() => {
    console.log(userCookie);
    (async() => {
      const newUser = await getUserData(user);
      setUserData(newUser);
    })();
  }, [user]);

  const handleSignOut = async () => {
    await signOutUser();
    setUser(undefined);
    setUserCookie(undefined);
    router.push("/")
  }

  return (
    <nav className="foreground mb-2 flex w-full items-center justify-between border border-black p-4">
      <h1 className="p-auto text-4xl">
        <Link href="/">DatalentTEK</Link>
      </h1>

      <ul className="flex flex-row space-x-2">
        <li>
          <Link href="/aboutus">
            <button className="rounded-lg border bg-blue-600 p-2">About Us</button>
          </Link>
        </li>

        {userData === undefined ? (
          <>
            <li>
              <Link href="/login">
                <button className="rounded-lg border bg-blue-600 p-2">Login</button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <button className="rounded-lg border bg-blue-600 p-2">Register</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/profile">
                <button className="rounded-lg border bg-blue-600 p-2">Profile</button>
              </Link>
            </li>
            <li>
              <button className="rounded-lg border bg-blue-600 p-2" onClick={handleSignOut}>
                Logout from <strong>{userData.firstName}</strong>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}