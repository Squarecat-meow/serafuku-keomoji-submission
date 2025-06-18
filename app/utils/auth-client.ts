import {
  genericOAuthClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        handle: {
          type: 'string',
          required: true,
          defaultValue: null,
        },
      },
    }),
    genericOAuthClient(),
  ],
});
