"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider: NextPage<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
