import { User } from "@clerk/nextjs/server";

declare global {
  interface customJwtSessionClaims extends User {}
}
