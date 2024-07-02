"use client";

import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider: NextPage<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
