import { User } from "firebase/auth";
import { cookies } from "next/headers";

export default async function useServerFirebaseUser(): Promise<User | undefined> {
  const user = await cookies().get("user");

  if (user === undefined) return undefined;
  return JSON.parse(user.value) as User;
};