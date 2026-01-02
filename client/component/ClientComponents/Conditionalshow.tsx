"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";

export default function ConditionalNav() {
  const pathname = usePathname();

  const hideNavOnRoutes = ["/login", "/signup", "/dashboard", "/auth"];

  const shouldHide = hideNavOnRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHide) return null;

  return <Nav />;
}
