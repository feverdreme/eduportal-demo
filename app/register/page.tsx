"use client";

import { useRouter } from "next/navigation";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import FormInputField from "@/components/FormInputField";
import FormSelectField from "@/components/FormSelectField";

const handleCheckbox = (
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
) => {
  setState(!state);
};

const sendFormData = async (data: {
  name: string,
  education: string,
  major: string,
  email: string,
  password: string
}) => {
  const firstName = data.name.split(" ")[0];
  const lastName = data.name.split(" ").slice(1).join();
  const {education, major, email, password} = data;
  
  return await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      education,
      major,
      email,
      password,
    }),
  });
}

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zoomConsent, setZoomConsent] = useState(false);
  const [refundConsent, setRefundConsent] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    const res = await sendFormData({name, education, major, email, password});
    const { result, error } = await res.json();

    console.log({ result, error });
    router.push("/login");
  };

  return (
    <div className="foreground mx-auto w-1/3 space-y-2 rounded-md border border-black p-4">
      <h1 className="mb-4 text-5xl">Register</h1>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <FormInputField
          fieldName="Full Name"
          id="fullname"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
        />

        <FormSelectField
          fieldName="Education"
          id="education"
          onChange={(e) => setEducation(e.target.value)}
        >
          <option value="Select">--</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">Ph.D</option>
        </FormSelectField>

        <FormInputField
          fieldName="Program / Major"
          id="major"
          onChange={(e) => setMajor(e.target.value)}
        />

        <FormInputField
          fieldName="Email"
          id="email"
          placeholder="johndoe@website.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInputField
          fieldName="Password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <input
            type="checkbox"
            onChange={() => handleCheckbox(zoomConsent, setZoomConsent)}
          />
          <p className="inline">
            {" "}
            I understand that courses will be conducted through Zoom and that
            courses may be recorded. I understand that lecture recordings will
            be made available if I am absent to a lecture up to{" "}
            <strong>three</strong> times.
          </p>
        </div>

        <div>
          <input
            type="checkbox"
            onChange={() => handleCheckbox(refundConsent, setRefundConsent)}
          />
          <div className="inline">
            {" "}
            I consent to the refund policy:
            <ul className="ml-4 list-inside list-disc">
              <li>
                A full refund is available to those who are not satisfied after
              </li>
              the first lecture
              <li>
                An 80% refund is available to those who are not satisfied after
                the second lecture
              </li>
              <li>
                A 70% refund is available to those who are not satisfied after
                the third lecture
              </li>
              <li>
                No refund is available after completion or attendance of the
                fourth lecture
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-2">
          <button className="rounded-md bg-blue-500 p-2" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
