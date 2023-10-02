import firebaseApp from "@/firebase/firebaseApp";
import useTry, { useTryResult } from "@/hooks/useTry";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

const auth = getAuth(firebaseApp);

export interface userCreds {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const req: userCreds = await request.json();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let result = await useTry(signInWithEmailAndPassword(auth, req.email, req.password));

  return NextResponse.json(result);
}
