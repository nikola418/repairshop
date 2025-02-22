"use server";

import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { and, or, ilike, eq } from "drizzle-orm";
import { isUndefined } from "lodash";

export const getTickets = async ({
  search,
  isCompleted,
}: {
  search?: string;
  isCompleted?: boolean;
}) => {
  const results = await db
    .select({
      createdAt: tickets.createdAt,
      title: tickets.title,
      tech: tickets.tech,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      and(
        !isUndefined(search)
          ? or(
              ilike(tickets.title, `%${search}%`),
              ilike(tickets.description, `%${search}%`),
              ilike(tickets.tech, `%${search}%`),
              ilike(customers.firstName, `%${search}%`),
              ilike(customers.lastName, `%${search}%`),
              ilike(customers.email, `%${search}%`),
              ilike(customers.phone, `%${search}%`),
              ilike(customers.address1, `%${search}%`),
              ilike(customers.address2, `%${search}%`),
              ilike(customers.city, `%${search}%`),
              ilike(customers.state, `%${search}%`),
              ilike(customers.zip, `%${search}%`),
              ilike(customers.notes, `%${search}%`)
            )
          : undefined,
        !isUndefined(isCompleted)
          ? eq(tickets.completed, isCompleted)
          : undefined
      )
    );

  return results;
};
