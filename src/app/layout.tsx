import type { Metadata } from "next";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import { Providers } from "./Providers";

import "./globals.css";
import { cls } from "@/utils";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--roboto",
});

export const metadata: Metadata = {
  title: "서울시립미술관 소장품 정보",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cls(notoSansKr.className, roboto.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
