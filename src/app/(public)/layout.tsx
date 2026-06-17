import type { ReactNode } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import CookieBox from "@/components/ui/cookieBox";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBox />
    </>
  );
}
