"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/queries/safe-actions";
import { insertCustomerSchema } from "@/validators";
import type { InsertCustomerSchema } from "@/validators";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { first } from "lodash";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const saveCustomerAction = actionClient
  .metadata({
    actionName: "saveCustomerAction",
  })
  .schema(insertCustomerSchema, {
    handleValidationErrorsShape: async (errors) =>
      flattenValidationErrors(errors).fieldErrors,
  })
  .action(
    async ({
      parsedInput: customer,
    }: {
      parsedInput: InsertCustomerSchema;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();

      if (!isAuth) redirect("/login");

      if (customer.id) {
        const result = await db
          .update(customers)
          .set(customer)
          .where(eq(customers.id, customer.id))
          .returning({ updatedId: customers.id });

        return {
          message: `Customer ID #${
            first(result)?.updatedId
          } updated successfully!`,
        };
      }

      const result = await db
        .insert(customers)
        .values(customer)
        .returning({ insertedId: customers.id });

      return {
        message: `Customer ID #${
          first(result)?.insertedId
        } inserted successfully!`,
      };
    }
  );
