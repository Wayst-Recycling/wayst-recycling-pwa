import { DefaultJWT } from 'next-auth/jwt';

import { UserType } from '@/actions/auth/auth-types.server';

declare module 'next-auth' {
  interface Session {
    user: UserType;
    tokens: {
      accessToken: string;
      accessTokenExpires: string;
    };
    sessionUpdated?: boolean;
  }

  interface User {
    user: UserType;
    tokens: {
      accessToken: string;
      accessTokenExpires: string;
    };
    sessionUpdated?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    data: {
      user: UserType;
      tokens: {
        accessToken: string;
        accessTokenExpires: string;
      };
      sessionUpdated?: boolean;
    };
  }
}
