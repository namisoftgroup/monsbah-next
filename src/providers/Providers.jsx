"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "./AuthProvider";

export default function ReactQueryProvider({ children, locale, messages }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      now={new Date()}
      messages={messages}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
