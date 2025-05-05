import { Auth0Client } from "@auth0/nextjs-auth0/server";

const scope = process.env.AUTH0_SCOPE;
const audience = process.env.AUTH0_AUDIENCE;

if (!scope || !audience) {
  throw new Error("Missing AUTH0_SCOPE or AUTH0_AUDIENCE in environment variables.");
}

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope,
    audience,
  },
});
