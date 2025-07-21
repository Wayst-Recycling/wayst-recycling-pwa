import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token?.data;
    },
  },
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password|favicon|assets|fonts|svg|images|serviceWorker).*)',
  ],
};
