"use client";

import signOutUser from "@/firebase/database/signOutUser";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignOutButton(props: { userData: DocumentData; }) {
  const router = useRouter();
  const {userData} = props;

  const handleClick = () => {
    signOutUser();
    router.push("/");
  }

  return (
    <li>
      <button className="rounded-lg border bg-blue-600 p-2" onClick={handleClick}>
        Logout from <strong>{userData.firstName}</strong>
      </button>
    </li>
  );
}
