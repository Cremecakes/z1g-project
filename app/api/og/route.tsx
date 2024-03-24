import { ImageResponse } from "next/og";

// edging
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const imageData = await fetch(new URL("./logo.png", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );
  const inter = fetch(new URL("./inter.woff", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  return new ImageResponse(
    (
      <div
        tw="h-full w-full flex items-center justify-center text-[#e2e8f0] flex-col"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #020617, #1e293b)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width="192"
          height="192"
          tw="mb-8"
          alt=""
          src={imageData as unknown as string}
        />
        <p tw="text-4xl text-[#f8fafc]">{title}</p>
        <p tw="text-2xl text-[#cbd5e1]">{description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: await inter, weight: 300 }],
    },
  );
}
