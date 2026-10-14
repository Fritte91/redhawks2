// Vercel Routing Middleware. Runs only for /article/*: the old journal
// articles were retired, so answer 410 Gone with the static page from the
// build (dist/410.html) instead of a soft 404 or a redirect to the homepage.
// Every other missing URL gets Vercel's normal 404 with dist/404.html.

export const config = { matcher: '/article/:path*' }

export default async function middleware(request) {
  const page = await fetch(new URL('/410.html', request.url))
  return new Response(page.body, {
    status: 410,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex',
    },
  })
}
