import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req:request, res:response })
  // await supabase.auth.getSession()
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  const {data: {session}} = await supabase.auth.getSession()
  // if user is not signed in and the current path is not / redirect the user to /
  // console.log(session)

  if (session && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (!session && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return response;
  // return NextResponse.redirect(request.url)
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
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }