"use client";

import { NextPage } from "next";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: NextPage<Props> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <h4 className="font-light text-neutral-500 mt-2">{subtitle}</h4>
    </div>
  );
};

export default Heading;
