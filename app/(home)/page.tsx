import Link from "next/link";
import type { Metadata } from "next";

import links from "../links.json";

export const metadata: Metadata = {
  description: "The Homepage of the z1g Project",
};

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col justify-center text-center">
      <h1 className="mb-4 text-3xl font-bold">The z1g Project</h1>

      <p className="text-muted-foreground">
        z1g Project is a group that focuses on evading internet censorship.
      </p>

      <h3 className="mt-8 mb-4 text-2xl font-semibold">Links</h3>

      <ul>
        {links.map((link) => {
          return (
            <li key={link.url}>
              <Link
                href={link.url}
                className="text-foreground font-semibold underline hover:text-accent-foreground duration-300"
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
