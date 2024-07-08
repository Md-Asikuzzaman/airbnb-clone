"use client";

import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./ReactQueryProvider";

interface Props {
  children: React.ReactNode;
}

const Providers: NextPage<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <Toaster />
        {children}
      </ReactQueryProvider>
    </SessionProvider>
  );
};

export default Providers;
