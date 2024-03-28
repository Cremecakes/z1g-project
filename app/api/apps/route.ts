import { db } from "@/drizzle";
import { app as appSchema } from "@/drizzle/schema";
export async function GET() {
  const apps = await db.select().from(appSchema);
  return Response.json(apps);
}
export const runtime = "edge";
