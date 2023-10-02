"use client"
import { firebaseDB } from "@/firebase/firebaseApp";
import { User } from "firebase/auth";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import AdminView from "./AdminView";
import UserView from "./UserView";
import { Suspense, useEffect, useState } from "react";
import useUserProfile from "@/hooks/useUserProfile";
import { redirect, useRouter, useSearchParams } from "next/navigation"
import useServerFirebaseUser from "@/hooks/useServerFirebaseUser";
import useUserCookie from "@/hooks/useUserCookie";
import getUserData from "@/firebase/database/getUserData";


export default function Profile() {

  // const userData = await useUserProfile();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [user, setUser] = useUserCookie();
  const [userData, setUserData] = useState<DocumentData>({});

  useEffect(() => {
    if (user === undefined) router.push("/login");
    (async() => {
      const fetchedUserData = await getUserData(user)
      setUserData(fetchedUserData);
      if (fetchedUserData === undefined) {
        // redirect("/redirected-login");
        router.push("/redirected-login")
      }
    })();
  }, []);


  return (
    <div className="p-2">
      <h1>Welcome, {userData?.firstName}</h1>

      <Suspense fallback={<div>Loading...</div>}>
        {userData?.admin ? <AdminView /> : <UserView userData={userData} />}
      </Suspense>
    </div>
  );
}