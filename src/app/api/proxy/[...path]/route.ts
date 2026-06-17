import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL;

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url = `${BACKEND_URL}/${path.join("/")}${req.nextUrl.search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const data = await response.json();

  if (response.status === 401) {
    return NextResponse.json(data, { status: 401 });
  }

  return NextResponse.json(data, { status: response.status });
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
