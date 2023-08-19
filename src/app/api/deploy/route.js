import { NextResponse } from "next/server";

export async function GET(request) {
  // make env variable later
  const res = await fetch(
    "hhttps://api.vercel.com/v12/projects/prj_85twJD33MR5a4HemL6NZA4nJhHa9/deployments"
  );
  return NextResponse.json({ succes: "true", res }, { status: 200 });
}
