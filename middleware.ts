import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  // Get the preferred locale from Accept-Language header or cookies
  const cookieLocale = request.cookies.get('locale')?.value;
  const acceptLanguage = request.headers.get('accept-language');

  let locale = cookieLocale;

  if (!locale) {
    // Detect locale from Accept-Language header
    if (acceptLanguage) {
      if (acceptLanguage.includes('pt')) {
        locale = 'pt';
      } else {
        locale = 'en';
      }
    } else {
      locale = 'pt'; // Default to Portuguese
    }
  }

  // Set locale cookie if not present
  if (!cookieLocale) {
    const response = NextResponse.next();
    response.cookies.set('locale', locale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};