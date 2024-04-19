import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "SABC PLUS",
  description: "sabc-plus.com clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#222127]">
        <Header/>
        {children}
      </body>
    </html>
  );
}
