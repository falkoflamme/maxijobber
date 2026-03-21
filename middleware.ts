import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ── Preview password protection ──────────────────────────────────────────────
// Set PREVIEW_PASSWORD in env to enable. Remove the var to go public.
function checkPreviewAuth(request: NextRequest): NextResponse | null {
  const password = process.env.PREVIEW_PASSWORD
  if (!password) return null // disabled — site is public

  // Allow the auth challenge itself to pass through
  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const [, pass] = atob(encoded).split(':')
      if (pass === password) return null // correct password — let through
    }
  }

  // Demand credentials
  return new NextResponse('Zugang nur mit Passwort.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="MaxiJobber Preview"',
    },
  })
}

// ── Main middleware ───────────────────────────────────────────────────────────
export async function middleware(request: NextRequest) {
  // Preview gate — runs before everything else
  const previewBlock = checkPreviewAuth(request)
  if (previewBlock) return previewBlock

  // Admin auth via Supabase
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
