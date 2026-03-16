import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Root layout — no <html> or <body> here.
// Those are in [locale]/layout.tsx so next-intl can set lang attribute.
export default function RootLayout({ children }: Props) {
  return children;
}

