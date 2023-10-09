import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/context/session/Provider";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import ClientSessionProvider from "@/context/client-session";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Countdown Hub",
  description:
    "Create Your Countdown, or Count down the days, hours, minutes, and seconds of your favorite movies, TV, and Anime.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='dracula'>
      <body className={inter.className}>
        <NextTopLoader color='#641ae6' showSpinner={false} />
        <ToastContainer />
        <Provider>
          <ClientSessionProvider>
            <Navbar />
            {children}
            <Footer />
          </ClientSessionProvider>
        </Provider>
      </body>
    </html>
  );
}
