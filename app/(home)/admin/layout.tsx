import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: React.ReactNode) {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }
  return children;
}
