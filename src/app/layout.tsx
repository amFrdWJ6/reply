import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const lato = Lato({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reply",
  description: "Reply to anyone as true memelord",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${lato.className} flex w-full flex-col items-center justify-center bg-quaternary`}
      >
        <SessionProvider session={session}>
          <Header />
          <main className="z-0 flex w-full max-w-5xl flex-col items-center p-2">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
