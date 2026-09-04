import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AutocompletePrediction = {
  placePrediction?: {
    placeId?: string;
    text?: { text?: string };
    structuredFormat?: {
      mainText?: { text?: string };
      secondaryText?: { text?: string };
    };
  };
};

type ApiResponse = {
  suggestions?: AutocompletePrediction[];
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
  const input = (searchParams.get("q") || "").trim();
  const session = searchParams.get("session") || undefined;

  if (input.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const res = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
        },
        body: JSON.stringify({
          input,
          regionCode: "ID",
          languageCode: "id",
          sessionToken: session,
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Places API ${res.status}: ${text.slice(0, 200)}` },
        { status: res.status },
      );
    }

    const data = (await res.json()) as ApiResponse;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
