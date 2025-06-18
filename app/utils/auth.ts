import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../generated/prisma';
import { genericOAuth } from 'better-auth/plugins';
import { inferAdditionalFields } from 'better-auth/client/plugins';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      handle: {
        type: 'string',
        required: true,
        defaultValue: null,
      },
    },
  },
  plugins: [
    inferAdditionalFields({
      user: {
        handle: {
          type: 'string',
          required: true,
        },
      },
    }),
    genericOAuth({
      config: [
        {
          providerId: 'misskey',
          clientId: 'https://amazing-genie-0d6f42.netlify.app/',
          clientSecret: '',
          discoveryUrl:
            'https://serafuku.moe/.well-known/oauth-authorization-server',
          pkce: true,
          scopes: ['read:account'],
          getUserInfo: async (tokens) => {
            const res = await fetch('https://serafuku.moe/api/i', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens.accessToken}`,
              },
              method: 'POST',
              body: JSON.stringify({}),
            });

            const userInfo = await res.json();

            return {
              id: userInfo.id,
              name: userInfo.name,
              handle: `@${userInfo.username}@serafuku.moe`,
              email: `@${userInfo.username}@serafuku.moe`,
              emailVerified: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              image: userInfo.avatarUrl,
            };
          },
        },
      ],
    }),
  ],
});
