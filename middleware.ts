import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

  // const email = request.cookies.get("email");
  const token = request.cookies.get("user_token");
  // console.log("email : ",email);
  // console.log("token : ",token);
  // console.log("request.url : ",request.url);

  if(request.url.endsWith("api/status")){
    return NextResponse.next();
  }
  // if (!token) {
  //   console.log("no token")
  //   return NextResponse.redirect(new URL('/api/status', request.url));
  // }
  
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
