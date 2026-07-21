import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn Page",
  description: "Verdant premium analytics dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
