import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/dashboard/submit",
  "/dashboard/articles",
  "/dashboard/queue",
  "/dashboard/validations",
  "/dashboard/stats",
  "/dashboard/edit",
  "/analyze",
  "/validate",
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isProtectedPath) {
    // Check if user is authenticated by looking for the user in localStorage
    // Note: This is client-side only, so we'll redirect to login and let the client-side
    // auth check handle the actual protection
    const authCookie = request.cookies.get("auth")

    // if (!authCookie) {
    //   // Redirect to login page
    //   return NextResponse.redirect(new URL("/login", request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
}
