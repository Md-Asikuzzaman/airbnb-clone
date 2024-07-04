"use client";

import clsx from "clsx";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: NextPage<Props> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={clsx(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        selected ? "border-black" : "border-neutral-200"
      )}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
