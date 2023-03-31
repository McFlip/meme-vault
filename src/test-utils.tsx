import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { trpcReact } from '~/utils/api';
import { httpBatchLink } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from 'react';
import superjson from "superjson";
import { createTRPCMsw } from 'msw-trpc'
import type { AppRouter } from '~/server/api/root'

const url = `http://localhost:${process.env.PORT ?? 3000}/api/trpc`;

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const trpcClient = trpcReact.createClient({
  links: [httpBatchLink({ url })],
  transformer: superjson,
});

const withNextTRPC = ({ children }: { children: ReactNode }) => (
  <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpcReact.Provider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: withNextTRPC, ...options })

export * from '@testing-library/react'
export { customRender as render }
export const mswTrpc = createTRPCMsw<AppRouter>({
  baseUrl: url,
  transformer: {
    input: superjson,
    output: superjson
  }
})