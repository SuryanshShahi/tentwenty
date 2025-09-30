import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    
    // If user is authenticated and trying to access login page, redirect to timesheet
    if (req.nextauth.token && pathname === "/login") {
      return NextResponse.redirect(new URL("/timesheet", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to login page for unauthenticated users
        if (pathname === "/login") {
          return true;
        }
        
        // Require authentication for protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/timesheet/:path*",
    "/dashboard/:path*",
    "/login",
    // Add other protected routes here
  ],
};
