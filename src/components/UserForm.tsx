"use client";

import { useState } from "react";
import { CreateUserPayload } from "../types/user";
import { createUser } from "../lib/api";

const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^[6-9]\d{9}$/;

interface Props {
  onSuccess: () => void;
}

const inputs = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    colSpan: "",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    colSpan: "",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    colSpan: "col-span-2",
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "tel",
    colSpan: "col-span-2",
  },
] as const;

const UserForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState<CreateUserPayload>({
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? Number(value) : value.trim(),
    }));
  };

  const validate = (): string | null => {
    if (!form.firstName || !form.lastName) {
      return "First and Last name are required";
    }

    if (!emailRegex.test(form.email)) {
      return "Invalid email address";
    }

    if (!phoneRegex.test(String(form.phone))) {
      return "Invalid Indian phone number";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createUser(form);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
      });

      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}

      {inputs.map(({ name, placeholder, type, colSpan }) => (
        <input
          key={name}
          name={name}
          type={type}
          value={name === "phone" ? form.phone || "" : form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`border p-2 ${colSpan}`}
          required
        />
      ))}

      <button
        disabled={loading}
        className="bg-black text-white p-2 col-span-2 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default UserForm;
