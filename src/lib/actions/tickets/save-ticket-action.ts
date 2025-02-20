"use server";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/queries/safe-actions";
import { InsertTicketSchema, insertTicketSchema } from "@/zod-schemas/ticket";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { first } from "lodash";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const saveTicketAction = actionClient
  .metadata({
    actionName: "saveTicketAction",
  })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (errors) =>
      flattenValidationErrors(errors).fieldErrors,
  })
  .action(
    async ({ parsedInput: ticket }: { parsedInput: InsertTicketSchema }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();

      if (!isAuth) redirect("/login");

      if (ticket.id) {
        const result = await db
          .update(tickets)
          .set(ticket)
          .where(eq(tickets.id, ticket.id))
          .returning({ updatedId: tickets.id });

        return {
          message: `Ticket ID #${
            first(result)?.updatedId
          } updated successfully!`,
        };
      }

      const result = await db
        .insert(tickets)
        .values(ticket)
        .returning({ insertedId: tickets.id });

      return {
        message: `Ticket ID #${
          first(result)?.insertedId
        } inserted successfully!`,
      };
    }
  );
