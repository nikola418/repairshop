import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { NeonDbError } from "@neondatabase/serverless";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({ actionName: z.string() });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;

    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: e.message });
      scope.setContext("metadata", { actionName: metadata?.actionName });
      scope.setContext("clientInput", { clientInput });

      return scope;
    });

    if (e instanceof NeonDbError) {
      console.error(e);
      return "Database Error: Your data did not save.";
    }

    return e.message;
  },
});
