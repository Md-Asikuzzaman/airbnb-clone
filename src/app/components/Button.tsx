"use client";

import clsx from "clsx";
import { NextPage } from "next";
import { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  isPending?: boolean;
}

const Button: NextPage<Props> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  isPending,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full",
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white",

        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      <div className="flex items-center gap-2 justify-center">
        {isPending && (
          <BiLoaderAlt size={20} className="animate-spin duration-100" />
        )}
        {label}
      </div>
    </button>
  );
};

export default Button;
