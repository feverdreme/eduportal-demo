import { firebaseDB } from "@/firebase/firebaseApp";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";

import useServerFirebaseUser from "./useServerFirebaseUser";

export default async function useUserProfile(): Promise<DocumentData|undefined> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = await useServerFirebaseUser();

  if (user === undefined) return undefined;

  const userDataRef = collection(firebaseDB, "userData");
  const emailQuery = query(userDataRef, where("email", "==", user.email));
  const querySnapshot = await getDocs(emailQuery);

  let userData: DocumentData | undefined = undefined;
  querySnapshot.forEach((doc) => {
    userData = doc.data();
  });

  return userData;
}

