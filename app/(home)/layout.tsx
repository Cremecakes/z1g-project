import { Layout } from "fumadocs-ui/layout";
import Link from "next/link";
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
              {layoutOptions.nav && layoutOptions.nav.children}
              {session ? (
                <Link
                  href="/auth/logout"
                  className="hover:text-foreground text-muted-foreground text-sm duration-300"
                >
                  Sign Out
                </Link>
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
