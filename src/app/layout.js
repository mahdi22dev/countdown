import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/context/session/Provider";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='dracula'>
      <body className={inter.className}>
        <NextTopLoader color='#9fc78e' showSpinner={false} />

        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
