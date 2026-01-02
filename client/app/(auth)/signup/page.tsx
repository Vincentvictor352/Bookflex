import Signup from "@/component/ClientComponents/Signup";
import type { Metadata } from "next";
export const metadata = {
  title: "Sign Up | BookFlix",
  description:
    "Create your BookFlix account to start streaming movies and shows instantly.",
};
export default function PageSignup() {
  return <Signup />;
}
