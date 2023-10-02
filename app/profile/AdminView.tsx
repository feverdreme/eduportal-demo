"use client";

import { userSavedInfo } from "@/firebase/database/getAllUserData";
import { firebaseDB } from "@/firebase/firebaseApp";
import useTry from "@/hooks/useTry";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";

interface retrievedUser {
  id: string;
  data: userSavedInfo;
}

const retrieveUserData = async (): Promise<retrievedUser[]> => {
  const userDataRef = collection(firebaseDB, "userData");
  const querySnapshot = await getDocs(userDataRef);

  let users: retrievedUser[] = [];
  querySnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      data: doc.data() as userSavedInfo,
    });
  });

  return users;
};

export default function AdminView() {
  // TODO: implement data validation
  const [data, setData] = useState<retrievedUser[]>([]);
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>({});
  const [checkboxDiffs, setCheckboxDiffs] = useState<Set<string>>(new Set());
  const [hasMutated, setHasMutated] = useState<boolean>(false);

  const refreshComponent = async () => {
    let retrievedUserData = await retrieveUserData();
    setData(retrievedUserData);
    retrievedUserData.forEach((user) =>
      setCheckboxState((prevState) => ({
        ...prevState,
        [user.id]: user.data.madePayment,
      })),
    );
    setHasMutated(false);
    setCheckboxDiffs(new Set());
  }

  // initial hydration
  useEffect(() => {
    refreshComponent();
  }, []);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, userId: string) => {
    let deepCopy = new Set(checkboxDiffs);
    if (deepCopy.has(userId)) deepCopy.delete(userId);
    else deepCopy.add(userId);

    setCheckboxState({ ...checkboxState, [userId]: e.target.checked });
    setCheckboxDiffs(deepCopy);
  };

  // detect when the button needs to exist
  useEffect(() => {
    setHasMutated(checkboxDiffs.size != 0);
  }, [checkboxDiffs]);

  const submitChanges = async () => {
    let uploadedData: Record<string, boolean> = {};
    checkboxDiffs.forEach(userId => {
      uploadedData[userId] = checkboxState[userId];
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let result = await fetch("/api/editPaymentInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadedData),
    });

    if (result.status === 200) {
      refreshComponent();
    }
  };

  return (
    <>
      <table className="border border-black">
        <thead>
          <tr className="border border-black">
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Email</th>
            <th className="border border-black p-2">Made Payment</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user: retrievedUser) => (
            <tr className="border border-black" key={user.id}>
              <td className="border border-black p-2" key={user.id + "name"}>{`${user.data.lastName}, ${user.data.firstName}`}</td>
              <td className="border border-black p-2" key={user.id + "email"}>
                {user.data.email}
              </td>
              <td className="border border-black p-2 text-center" key={user.id + "madePayment"}>
                <input
                  type="checkbox"
                  defaultChecked={user.data.madePayment}
                  checked={checkboxState[user.id]}
                  onChange={(e) => handleCheckboxChange(e, user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!hasMutated || (
        <>
          <button className="border border-black m-2" onClick={submitChanges}>
            Submit Changes
          </button>
          <button className="border border-black m-2" onClick={refreshComponent}>
            Cancel Changes
          </button>
        </>
      )}
    </>
  );
}