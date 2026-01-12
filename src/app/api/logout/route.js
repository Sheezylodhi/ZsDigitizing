import { NextResponse } from "next/server";

// This is a server route
export async function GET(req) {
  // Clear JWT token cookie
  const response = NextResponse.redirect("/admin/login"); // redirect to login page
  response.cookies.set({
    name: "token",      // same cookie name used for login
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,          // delete cookie
  });

  return response;
}
