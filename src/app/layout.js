import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});

export const metadata = {
  title: "The Admission Bridge",
  description: "Find and apply to universities worldwide with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased`}>
        {children} <Footer></Footer>
      </body>
    </html>
  );
}
