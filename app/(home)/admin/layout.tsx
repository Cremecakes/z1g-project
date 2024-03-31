import type { ReactNode } from "react";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }
  return children;
}
