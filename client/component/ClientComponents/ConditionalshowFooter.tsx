"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const hideNavOnRoutes = ["/login", "/dashboard", "/signup", "/auth"];

  const shouldHide = hideNavOnRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHide) return null;

  return <Footer />;
}
