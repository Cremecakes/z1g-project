import { pageTree } from "../source";
import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layout";
import { Discord } from "@/components/icons";
import Image from "next/image";
import type { ReactNode } from "react";
export const layoutOptions: Omit<DocsLayoutProps, "children"> = {
  tree: pageTree,
  nav: {
    title: (
      <>
        <Image
          src="/logo.png"
          alt="z1g Project"
          width={32}
          height={32}
          className="max-md:hidden"
        />
        <span className="ml-3 font-semibold max-md:hidden">z1g Project</span>
      </>
    ),
    transparentMode: "top",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/6cpcbKwjBn",
        icon: <Discord className="h-6 w-6" />,
      },
    ],
    githubUrl: "https://github.com/z1g-project",
  },
};
export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return <DocsLayout {...layoutOptions}>{children}</DocsLayout>;
}
