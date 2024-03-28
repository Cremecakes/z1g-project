import { AddForm } from "./page.client";
import { db } from "@/drizzle";
import { app as appSchema } from "@/drizzle/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default async function Page() {
  const apps = await db.select().from(appSchema);
  return (
    <div className="justify-center text-center flex flex-col">
      <div className="text-4xl font-bold">Apps</div>
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            {Object.keys(appSchema).map((key) => (
              <TableHead key={key} className="text-center">
                {key}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app, key) => (
            <TableRow key={key} className="h-12">
              {Object.keys(appSchema).map((key) => (
                <TableCell className="text-ellipsis" key={key}>
                  {app[key as keyof typeof app]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddForm />
    </div>
  );
}
