"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Loader2, ChevronLeft } from "lucide-react";
export default function SignOut() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <CardContent>
      <p className="text-center">Are you sure you want to log out?</p>
      <Button
        disabled={loading}
        className="mt-6 w-full"
        onClick={() => {
          setLoading(true);
          signOut({ callbackUrl: "/" });
        }}
      >
        {!loading ? (
          <LogOut className="mr-2 size-4" />
        ) : (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        )}
        {loading ? "Logging out" : "Log out"}
      </Button>
      <Button
        disabled={loading}
        variant="outline"
        className="mt-4 w-full bg-background/50 transition-all duration-200 hover:bg-background/65"
        onClick={() => router.back()}
      >
        <ChevronLeft className="mr-2 size-4" />
        Go back
      </Button>
    </CardContent>
  );
}
