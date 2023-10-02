"use client";

import RegisterFormField from "@/components/FormInputField";
import { UserContext } from "@/contexts/UserContext";
import getUserData from "@/firebase/database/getUserData";
import { useTryResult } from "@/hooks/useTry";
import useUserCookie from "@/hooks/useUserCookie";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useState } from "react";


const sendFormData = async (email: string, password: string) => {
  return await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [existsError, setExistsError] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const [userCookie, setUserCookie] = useUserCookie();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const resp = await sendFormData(email, password);
    const respData: useTryResult<UserCredential> = await resp.json();

    // TODO: handle the error when auth fails
    if (respData.error) return;
    
    console.log(respData.result.user);
    const userData = await getUserData(respData.result.user);

    if (userData?.madePayment || userData?.admin) {
      setUserCookie(respData.result.user);
      setUser(respData.result.user);
      router.push("/profile");
    } else {
      setExistsError(true);
    }
  };

  return (
    <div className="foreground border border-black rounded-md w-1/3 mx-auto space-y-2 p-4">
      <h1 className="text-5xl mb-4">Login</h1>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <RegisterFormField fieldName="Email" id="email" placeholder="johndoe@website.com" type="email" onChange={(e) => setEmail(e.target.value)} />

        <RegisterFormField fieldName="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <div className="pt-2">
          <button className="bg-blue-500 p-2 rounded-md" type="submit">
            Submit
          </button>
        </div>

        {existsError ? (
          <div>
            <p>Your account is not active. Please make your payment to activate your account.</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}