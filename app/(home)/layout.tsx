import { Layout } from "fumadocs-ui/layout";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";
import type { ReactNode } from "react";
import { layoutOptions } from "../layout-options";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <Layout
      {...{
        ...layoutOptions,
        nav: {
          ...layoutOptions.nav,
          children: (
            <>
              {session && (
                <>
                  <div className="text-secondary-foreground text-sm flex justify-center items-center">
                    <Image
                      src={session?.user?.image as string}
                      alt="User Image"
                      width={25}
                      height={25}
                      className="rounded-full mr-2"
                    />
                    Welcome, {session?.user?.name || session?.user?.email}
                  </div>
                  <div className="text-foreground">|</div>
                </>
              )}
              {layoutOptions.nav && layoutOptions.nav.children}
              {session ? (
                <>
                  <Link
                    href="/admin"
                    className="hover:text-foreground text-muted-foreground text-sm duration-300"
                  >
                    Admin
                  </Link>
                  <Link
                    href="/auth/logout"
                    className="hover:text-foreground text-muted-foreground text-sm duration-300"
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="hover:text-foreground text-muted-foreground text-sm duration-300"
                >
                  Sign In
                </Link>
              )}
            </>
          ),
        },
      }}
    >
      {children}
    </Layout>
  );
}
