import { User } from "firebase/auth";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { firebaseDB } from "../firebaseApp";

export default async function getUserData(user: User | undefined): Promise<DocumentData | undefined> {
  if (user === undefined) return undefined;

  const userDataRef = collection(firebaseDB, "userData");
  const emailQuery = query(userDataRef, where("email", "==", user.email));
  const querySnapshot = await getDocs(emailQuery);

  let userData: DocumentData | undefined = undefined;
  querySnapshot.forEach((doc) => {
    userData = doc.data();
  });

  return userData;
};
