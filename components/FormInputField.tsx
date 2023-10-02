import { ChangeEventHandler } from "react";
import "./FormField.css";

export default function FormInputField(props: {
  fieldName: string;
  id: string;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const { fieldName, id, placeholder, type, onChange } = props;

  return (
    <div className="formInputField">
      <label className="block" htmlFor={id}>
        {fieldName}
      </label>

      <input
        id={id}
        type={type ?? "text"}
        placeholder={placeholder}
        onChange={onChange}
        required
      ></input>
    </div>
  );
}
