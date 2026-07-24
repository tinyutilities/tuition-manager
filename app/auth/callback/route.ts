import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  // Google redirects here with `?error=` (e.g. access_denied) instead of
  // `?code=` when the user cancels consent or the provider rejects the request.
  const oauthError = searchParams.get('error_description') ?? searchParams.get('error')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }

    // exchangeCodeForSession() returns an AuthError (often an AuthApiError),
    // which carries `name`/`code`/`status` alongside `message` — surface all
    // of them instead of just `message`, which GoTrue truncates/summarizes.
    const errorDetails = `${error.name} (status: ${error.status ?? 'n/a'}, code: ${error.code ?? 'n/a'}): ${error.message}`

    console.error('[auth/callback] exchangeCodeForSession failed:', {
      name: error.name,
      status: error.status,
      code: error.code,
      message: error.message,
    })

    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(errorDetails)}`
    )
  }

  return NextResponse.redirect(
    `${origin}/auth/login${oauthError ? `?error=${encodeURIComponent(oauthError)}` : ''}`
  )
}