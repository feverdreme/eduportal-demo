import useServerFirebaseUser from "@/hooks/useServerFirebaseUser";
import { DocumentData } from "firebase/firestore";
import { redirect } from "next/navigation";

export default async function UserView(props: { userData: DocumentData }) {
  const { userData } = props;

  return (
    <div>
      <h1>Your courses:</h1>
      <ul className="list-disc pl-4">
        <li>Course 1</li>
      </ul>
    </div>
  );
}
