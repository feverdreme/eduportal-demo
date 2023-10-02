import { firebaseDB } from "@/firebase/firebaseApp";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req: Record<string, boolean> = await request.json();

  for (const [userId, state] of Object.entries(req)) {
    let userRef = doc(firebaseDB, "userData", userId);
    await updateDoc(userRef, {
      madePayment: state
    });
  }

  return NextResponse.json({status: 200});
};