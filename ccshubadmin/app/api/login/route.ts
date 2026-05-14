import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { token } = await req.json();

  const decodedToken = await admin.auth().verifyIdToken(token);

  const { role, admin: isAdmin } = decodedToken;

  const isAllowed =
    role === "admin" || isAdmin === true;

  if (!isAllowed) {
    return NextResponse.json(
      { error: "Access denied: Admin only" },
      { status: 403 }
    );
  }

  const sessionCookie = await admin.auth().createSessionCookie(token, {
    expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set("session", sessionCookie, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return res;
}