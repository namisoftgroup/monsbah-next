"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";

export default function ReactQueryProvider({ children, locale, messages }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      now={new Date()}
      messages={messages}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
