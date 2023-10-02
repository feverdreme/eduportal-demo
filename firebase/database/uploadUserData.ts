import {collection, addDoc} from "firebase/firestore"
import { firebaseDB } from "@/firebase/firebaseApp"
import useTry, { useTryResult } from "@/hooks/useTry";
import { userDataSubmissionType } from "@/app/api/register/route";

export interface userSavedInfo extends userDataSubmissionType {
  madePayment: boolean;
  admin: boolean;
};

export default async function uploadUserData(info: userSavedInfo) {
  let patchedInfo = info as userSavedInfo;
  patchedInfo.madePayment = false;
  patchedInfo.admin = false;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let result = useTry(addDoc(collection(firebaseDB, "userData"), patchedInfo));
  return result;
};
