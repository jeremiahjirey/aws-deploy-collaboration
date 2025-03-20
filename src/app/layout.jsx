import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const fontPoppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Landing Page Web",
  description: "Testing Deploy Landing Page on AWS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontPoppins.className}  antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
