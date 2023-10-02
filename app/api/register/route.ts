import editUserData, { userSavedInfo } from "@/firebase/database/uploadUserData";
import firebaseApp from "@/firebase/firebaseApp";
import useTry, { useTryResult } from "@/hooks/useTry";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { NextResponse } from "next/server";


const auth = getAuth(firebaseApp);

export interface userDataSubmissionType {
  firstName: string;
  lastName: string;
  education: string;
  major: string;
  email: string;
  password?: string;
};

export async function POST(request: Request) {
  const req: userDataSubmissionType = await request.json();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let result = await useTry<any>(createUserWithEmailAndPassword(auth, req.email, req.password ?? "ERROR"))

  if (result.error !== null)
    return NextResponse.json(result);

  delete req.password;
  console.log(req);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  result = await useTry(editUserData(req as userSavedInfo));
  
  return NextResponse.json(result);
}