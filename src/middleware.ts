import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path*"],
};

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api", "");
  console.log("middleware!", path);
  return NextResponse.rewrite("http://localhost:5177" + path);
}
