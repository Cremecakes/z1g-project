import { db } from "@/drizzle";
import { app } from "@/drizzle/schema";
export async function POST(req: Request, res: Response) {
  const data = await req.json();
  await db
    .insert(app)
    .values(data)
    .onConflictDoUpdate({
      target: app.name,
      set: { description: data.description, url: data.url, image: data.image },
    }).catch((error) => {
      console.error(error);
      return Response.json({ error: error.message }, { status: 500 });
    })
    return Response.json({ success: true });
}
