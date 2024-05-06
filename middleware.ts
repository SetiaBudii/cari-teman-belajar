import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

  // const email = request.cookies.get("email");
  const token = request.headers.get("Authorization");

  if(request.url.endsWith("api/status")){
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
    "/:path*"
  ],
};
