import type { AppProps } from "next/app";
import Head from "next/head";

import { AuthProvider } from "@/lib/use-auth";

import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Trello Redesign</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
