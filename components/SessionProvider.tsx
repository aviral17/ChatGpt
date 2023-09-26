"use client";
// use client so that we can use React hooks etc which we run on client side as Next js is Server Side Rendering framework

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

// children will be the contents wrapped inside <SessionProvider> </SessionProvider> in layout.tsx

type Props = {
  children: React.ReactNode;
  session: Session | null; // Session from next-auth
};

export function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}
