import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

 
  const protectedRoutes = ["/dashboard"];

  const currentUser = request.cookies.get("line-planner-jwt-token")?.value;
  const expTime = request.cookies.get("line-planner-jwt-expTime")?.value;

  // Ensure expTime is not undefined before parsing it
  const expirationTime = expTime ? parseInt(expTime) : 0;

  // console.log(currentUser, expirationTime);
  // console.log(request.nextUrl.pathname)

  if (
    protectedRoutes.includes(request.nextUrl.pathname) && (!currentUser || Date.now() < expirationTime)
  ) {
    // Redirect to login if accessing a protected route without authentication or expired token
    console.log("cookie deleted")
    request.cookies.delete("line-planner-jwt-token");
    request.cookies.delete("line-planner-jwt-expTime");
    request.cookies.delete("line-planner-jwt-name");
    const response = NextResponse.redirect(new URL("/user/login", request.url));
    response.cookies.delete("line-planner-jwt-token");
    response.cookies.delete("line-planner-jwt-expTime");
    response.cookies.delete("line-planner-jwt-name");
    return response;
  }

  return NextResponse.next();
}
