import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PlaceDetails = {
  id?: string;
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
};

export async function GET(req: Request) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "GOOGLE_MAPS_API_KEY belum diset." },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");
  const session = searchParams.get("session") || undefined;
  if (!placeId) {
    return NextResponse.json({ error: "placeId wajib." }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "id,formattedAddress,location",
        },
      },
    );
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Places API ${res.status}: ${text.slice(0, 200)}` },
        { status: res.status },
      );
    }
    const data = (await res.json()) as PlaceDetails;
    return NextResponse.json({
      placeId: data.id,
      description: data.formattedAddress ?? "",
      lat: data.location?.latitude ?? 0,
      lon: data.location?.longitude ?? 0,
      session,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
