import { NextResponse } from "next/server";

export async function GET(request) {
  // make env variable later
  const res = await fetch(
    "https://api.vercel.com/v1/integrations/deploy/prj_85twJD33MR5a4HemL6NZA4nJhHa9/a2I6UqQLY9"
  );
  const data = await res.json();
  return NextResponse.json({ succes: "true", data }, { status: 200 });
}
