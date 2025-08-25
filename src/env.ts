import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url().min(1),
    DATABASE_URL: z.string().url().min(1),
  },
  experimental__runtimeEnv: {},
});
