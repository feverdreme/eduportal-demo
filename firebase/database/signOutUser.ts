import { getAuth, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebaseApp";
import useTry from "@/hooks/useTry";
import { deleteCookie, getCookie } from "cookies-next";


export default async function signOutUser() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const res = await useTry(signOut(firebaseAuth));
  if (res.error) return res;

  deleteCookie("user");
  return res;
}
