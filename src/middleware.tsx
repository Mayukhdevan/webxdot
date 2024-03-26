import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/site', '/api/uploadthing'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/no-auth-in-this-route'],
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
    // Rewrite for domains
    const url = req.nextUrl
    console.log(req.url)
    const searchParams = url.searchParams.toString()
    const hostname = req.headers

    const pathWithSearchParams = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ''
    }`

    // If domain exists
    const customSubDomain = hostname
      .get('host')
      ?.split(process.env.NEXT_PUBLIC_DOMAIN!)
      .filter(Boolean)[0]

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      )
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/agency/sign-in', req.url))
    }

    if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/site', req.url))
    }

    if (url.pathname === '/agency' || url.pathname === '/subaccount') {
      return NextResponse.rewrite(new URL(pathWithSearchParams, req.url))
    }
  },
})

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
