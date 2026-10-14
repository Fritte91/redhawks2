// Cloudflare Worker in front of the static build (Workers Static Assets).
// wrangler.jsonc routes only the paths below through it; every other request
// is served straight from dist/, and unknown paths get 404.html with a 404.
//
//   /article, /article/*   retired journal articles -> 410.html, 410 Gone
//   /404(.html), /410(.html) the status pages themselves keep their status

const SECURITY_HEADERS = {
  'content-security-policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  'strict-transport-security': 'max-age=63072000; includeSubDomains',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
}

async function statusPage(request, env, name, status) {
  const page = await env.ASSETS.fetch(new URL(`/${name}`, request.url))
  return new Response(request.method === 'HEAD' ? null : page.body, {
    status,
    headers: {
      ...SECURITY_HEADERS,
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex',
    },
  })
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/article' || pathname.startsWith('/article/')) return statusPage(request, env, '410', 410)
    if (pathname === '/410' || pathname === '/410.html') return statusPage(request, env, '410', 410)
    if (pathname === '/404' || pathname === '/404.html') return statusPage(request, env, '404', 404)
    return env.ASSETS.fetch(request)
  },
}
