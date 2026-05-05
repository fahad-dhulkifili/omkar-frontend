import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import StyledProvider from "@/providers/StyledProvider";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Omkar Manpower Consultancy",
  description: "Your trusted partner in manpower and staffing solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <StyledProvider>
          <QueryProvider>
            {children}
            <Footer />
          </QueryProvider>
        </StyledProvider>
      </body>
    </html>
  );
}
