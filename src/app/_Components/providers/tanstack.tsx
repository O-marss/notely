"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface TanStackProviderProps {
  children: React.ReactNode;
}

export const queryCLient = new QueryClient();

export const TanStackProvider = ({ children }: TanStackProviderProps) => {

  return (
    <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
  );
};
