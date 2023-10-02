import useTry from "@/hooks/useTry";
import { DocumentData, QuerySnapshot, collection, getDocs } from "firebase/firestore";

import { firebaseDB } from "../firebaseApp";
import { BooleanLike } from "react-if";

export interface userDataType {
  firstName: string;
  lastName: string;
  education: string;
  major: string;
  email: string;
}

export interface userSavedInfo extends userDataType {
  madePayment: boolean;
  admin: boolean;
}

export default function getAllUserData() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useTry(getDocs(collection(firebaseDB, "userData")));
}
