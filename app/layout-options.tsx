import { Discord } from "@/components/icons";
import type { DocsLayoutProps } from "fumadocs-ui/layout";
import Image from "next/image";
import { pageTree } from "./source";
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
        <span className="ml-3 font-semibold max-md:hidden text-lg text-nowrap">
          z1g Project
        </span>
      </>
    ),
    transparentMode: "top",
  },
  links: [
    {
      url: "/",
      text: "Home",
    },
    {
      url: "/docs",
      text: "Docs",
    },
    {
      text: "Discord",
      url: "https://discord.gg/P2yDJuHVKq",
      icon: <Discord className="h-6 w-6" />,
      type: "secondary",
      external: true,
    },
    {
      type: "secondary",
      text: "GitHub",
      url: "https://github.com/z1g-project",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          fill="none"
        >
          <title>GitHub</title>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35 0-.172-.006-.628-.01-1.233-2.016.438-2.442-.972-2.442-.972-.33-.838-.805-1.06-.805-1.06-.658-.45.05-.441.05-.441.728.051 1.11.747 1.11.747.647 1.108 1.697.788 2.11.602.066-.468.254-.788.46-.969-1.61-.183-3.302-.805-3.302-3.583 0-.792.283-1.438.747-1.945-.075-.184-.324-.92.07-1.92 0 0 .61-.194 1.994.744A6.963 6.963 0 0 1 7.5 3.756 6.97 6.97 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743.396.998.147 1.735.072 1.919.465.507.745 1.153.745 1.945 0 2.785-1.695 3.398-3.31 3.577.26.224.492.667.492 1.343 0 .97-.009 1.751-.009 1.989 0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      external: true,
    },
  ],
};
