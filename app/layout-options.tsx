import { pageTree } from "./source";
import { type DocsLayoutProps } from "fumadocs-ui/layout";
import { Discord } from "@/components/icons";
import Image from "next/image";
import Link from "fumadocs-core/link";
const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/docs",
    label: "Docs",
  },
];
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
          className="max-md:hidden -mr-2"
        />
        <span className="ml-3 font-semibold max-md:hidden text-lg">
          z1g Project
        </span>
      </>
    ),
    children: (
      <>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-foreground text-muted-foreground text-sm duration-300"
          >
            {link.label}
          </Link>
        ))}
      </>
    ),
    transparentMode: "top",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/P2yDJuHVKq",
        icon: <Discord className="h-6 w-6" />,
      },
    ],
    githubUrl: "https://github.com/z1g-project",
  },
};
