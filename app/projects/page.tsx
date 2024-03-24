import type { Metadata } from "next";

import projects from "../projects.json";

export const metadata: Metadata = {
  description: "THe z1g Project - Projects",
};

export default function ProjectsPage() {
  return (
    <main className="flex h-screen flex-col justify-center text-center">
      <h1 className="mb-4 text-3xl font-bold">Projects</h1>

      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => {
          return (
            <div>
              <h1>{project.title}</h1>
            </div>
          )
        })}
      </div>
    </main>
  )
}