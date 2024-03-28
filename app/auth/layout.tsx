import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { Session } from "@/components/providers";
export default async function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  return (
    <Session {...{ session }}>
      <main className="min-h-screen bg-background">
        <section className="flex min-h-screen items-center justify-center">
          <Card className="mx-auto flex min-h-72 w-96 flex-col items-center justify-center bg-foreground/10 py-12 backdrop-blur-md">
            {children}
          </Card>
        </section>
      </main>
    </Session>
  );
}
