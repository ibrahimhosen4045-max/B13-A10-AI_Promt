import { NextResponse } from 'next/server'
import { auth } from './lib/auth' 
import { headers } from 'next/headers'
 
// ১. ফাংশনের নাম এখন অবশ্যই 'proxy' হতে হবে
export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // ২. যে পেজগুলো ইউজার লগইন ছাড়াই (ফ্রি) দেখতে পারবে
    const freeRoutes = [
        '/',          
        '/allPrompt',     
        '/login',     
        '/register'   
    ];

    if (freeRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if (!session) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}
 
// ৩. কনফিগ ম্যাচিং আগের মতোই থাকবে
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}