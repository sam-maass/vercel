import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "ab-cta";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get(COOKIE)) {
    const bucket = Math.random() < 0.5 ? "A" : "B";
    res.cookies.set(COOKIE, bucket, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  matcher: "/",
};
