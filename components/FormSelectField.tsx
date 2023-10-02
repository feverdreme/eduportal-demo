import { ChangeEventHandler, ReactNode } from "react";
import "./FormField.css";

export default function FormSelectField(props: {
  fieldName: string;
  id: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  children: ReactNode[];
}) {
  const { fieldName, id, onChange, children } = props;

  return (
    <div className="formSelectField">
      <label className="block" htmlFor={id}>
        {fieldName}
      </label>

      <select id={id} onChange={onChange} required>
        {children}
      </select>
    </div>
  );
}
