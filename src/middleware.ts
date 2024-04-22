import { type NextRequest, type NextResponse } from "next/server";
import { defaultLocale } from "@/lib/locales";
import createMiddleware from "next-intl/middleware";
import { localeCodes } from "./lib/locales";

const nextIntlMiddleware = createMiddleware({
  locales: localeCodes,
  defaultLocale,
  localePrefix: "never",
});

export function middleware(req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  // match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
