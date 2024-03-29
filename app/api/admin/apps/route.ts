import { db } from "@/drizzle";
import { app } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
export async function POST(req: Request) {
  const data = await req.json();
  await db
    .insert(app)
    .values(data)
    .onConflictDoUpdate({
      target: app.name,
      set: { description: data.description, url: data.url, image: data.image },
    })
    .catch((error) => {
      console.error(error);
      return Response.json({ error: error.message }, { status: 500 });
    });
  return Response.json({ success: true });
}
export async function DELETE(req: Request) {
  const { name } = await req.json();
  await db
    .delete(app)
    .where(eq(app.name, name))
    .catch((error) => {
      console.error(error);
      return Response.json({ error: error.message }, { status: 500 });
    });
  return Response.json({ success: true });
}
export const runtime = "edge";
