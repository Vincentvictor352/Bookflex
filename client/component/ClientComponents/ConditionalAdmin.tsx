"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalAdmin() {
  const pathname = usePathname();

  const hideNavOnRoutes = ["/dashboard"];

  const shouldHide = hideNavOnRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHide) return null;

  return <Footer />;
}
