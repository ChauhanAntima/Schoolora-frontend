import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ezyschooling — Find their happy place",
  description: "Explore, compare and enquire about schools that fit your child. Find your happy place with Ezyschooling.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}<SiteFooter/></body></html>;
}
