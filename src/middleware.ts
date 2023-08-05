import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req:request, res:response })
  const {data: {session}} = await supabase.auth.getSession()

  // console.log(session)

  if (session) {
    const {data: user_data, error: user_data_error} = await supabase
      .from('uni_users')
      .select('is_first_time')
      .eq('user_id', session.user.id)
     if (! user_data_error ) {
       if (user_data?.length > 0 && user_data[0] !== undefined) {
         if (user_data[0].is_first_time && request.nextUrl.pathname !== '/app/profile/set-username') {
           return NextResponse.redirect(new URL('/app/profile/set-username', request.url))
         }
         if (!user_data[0].is_first_time && request.nextUrl.pathname === '/app/profile/set-username') {
           return NextResponse.redirect(new URL('/app', request.url))
         }
       }
     }
  }

  if (session && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (!session && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return response;
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