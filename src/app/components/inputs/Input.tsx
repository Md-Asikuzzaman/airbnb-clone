"use client";

import signUpSchema from "@/schema/signUpSchema";
import clsx from "clsx";
import { NextPage } from "next";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { z } from "zod";

type FormData = z.infer<typeof signUpSchema>;

interface Props {
  id: "name" | "email" | "password";
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}

const Input: NextPage<Props> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <h2></h2>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder=" "
        className={clsx(
          "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          formatPrice ? "pl-9" : "pl-4",
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black"
        )}
      />

      <label
        className={clsx(
          "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          formatPrice ? "left-9" : "left-4",
          errors[id] ? "text-rose-500" : "text-zinc-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
