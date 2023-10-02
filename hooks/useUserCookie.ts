import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { User } from "firebase/auth";


const setUserCookie = (newUser: User|undefined) => {
  if (newUser === undefined) {
    deleteCookie("user");
  } else {
    setCookie("user", JSON.stringify(newUser));
  }
};

export default function useUserCookie() {
  let stateRes: User | undefined;
  let userCookie = getCookie("user");

  if (userCookie !== undefined && userCookie !== null)
    stateRes = JSON.parse(userCookie as string) as User;
  else
    stateRes = undefined

  return [stateRes, setUserCookie] as const;
};