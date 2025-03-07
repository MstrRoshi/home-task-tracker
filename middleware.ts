import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname.startsWith('/_next/')
  ) {
    return NextResponse.next();
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure matcher to exclude API routes from middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/socket (API routes, including socket.io)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/socket|_next/static|_next/image|favicon.ico).*)',
  ],
}; 