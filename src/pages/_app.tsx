import Navbar from "@/components/fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const disableNavbar = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
