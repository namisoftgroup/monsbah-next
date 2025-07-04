"use client";

import { getQueryClient } from "@/utils/queryCLient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import AuthProvider from "./AuthProvider";

export default function ReactQueryProvider({ children, locale, messages }) {
  const queryClient = getQueryClient();

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      now={new Date()}
      messages={messages}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
