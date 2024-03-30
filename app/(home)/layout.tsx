import { Layout } from "fumadocs-ui/layout";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth.config";
import type { ReactNode } from "react";
import { layoutOptions } from "../layout-options";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  return (
    <Layout
      {...{
        ...layoutOptions,
        nav: {
          ...layoutOptions.nav,
          children: (
            <>
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
                    Logout
                  </Link>
                  <div className="text-foreground hidden sm:block">|</div>
                  <div className="text-seondary-foreground text-sm flex justify-center items-center text-nowrap py-2">
                    <Image
                      src={session?.user?.image as string}
                      alt="User Image"
                      width={25}
                      height={25}
                      className="rounded-full mr-2 hidden sm:block"
                    />
                    <p className="hidden sm:block">
                      Welcome, {session?.user?.name || session?.user?.email}
                    </p>
                  </div>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="hover:text-foreground text-muted-foreground text-sm duration-300"
                >
                  Log In
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
