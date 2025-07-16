import { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import logger from '@/lib/logger';

import { BASE_URL, POST_METHOD } from '@/actions/action.constants';
import {
  INetworkErrorResponse,
  INetworkSuccessResponse,
} from '@/actions/action.types';
import { LOGIN_PATH } from '@/actions/auth/auth-constants.server';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login Form',
      id: 'login',
      credentials: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      authorize: async (credentials) => {
        try {
          const payload = {
            email: credentials?.email || '',
            password: credentials?.password || '',
          };

          const response = await fetch(`${BASE_URL}${LOGIN_PATH}`, {
            method: POST_METHOD,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (!response.ok) {
            const error: INetworkErrorResponse = data;

            throw new Error(error.errorMessage);
          }

          const loginResponse = data as INetworkSuccessResponse<User>;

          const user = {
            user: loginResponse.data.user,
            tokens: {
              accessToken: loginResponse.data.tokens.accessToken,
              refreshToken: loginResponse.data.tokens.refreshToken,
            },
          } as User;

          return user;
        } catch (error) {
          logger(error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }

        return null;
      },
    }),

    CredentialsProvider({
      name: 'Update Session',
      id: 'update-session',
      credentials: {
        session: {
          type: 'string',
        },
      },
      authorize: async (credentials) => {
        try {
          const updateSession: Session = JSON.parse(
            credentials?.session || '{}',
          );

          updateSession.sessionUpdated = true;
          return updateSession as unknown as User;
        } catch (error) {
          logger(error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,

  callbacks: {
    jwt: async ({ trigger, token, session, user }) => {
      if (trigger === 'update') {
        const updatedToken = token;
        updatedToken.data = session;
        return updatedToken;
      }

      // console.log('token: ', token)
      // console.log('user: ', user)

      if (user) {
        token.data = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.tokens = token.data.tokens;

      session.user = token.data.user;
      return session;
    },
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
