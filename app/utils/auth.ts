import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../generated/prisma';
import { genericOAuth } from 'better-auth/plugins';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: 'misskey',
          clientId:
            'https://squarecat-meow.github.io/serafuku-keomoji-login/oauth-static',
          clientSecret: '',
          discoveryUrl:
            'https://serafuku.moe/.well-known/oauth-authorization-server',
          pkce: true,
          scopes: ['read:account'],
          redirectURI: `${process.env.NEXT_PUBLIC_BASE_URL}/redirect`,
        },
      ],
    }),
  ],
});
