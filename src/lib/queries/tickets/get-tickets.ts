"use server";

import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { and, or, ilike, eq, sql, asc } from "drizzle-orm";
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
      id: tickets.id,
      title: tickets.title,
      tech: tickets.tech,
      completed: tickets.completed,
      createdAt: tickets.createdAt,
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
              ilike(tickets.tech, `%${search}%`),
              ilike(customers.email, `%${search}%`),
              ilike(customers.phone, `%${search}%`),
              ilike(customers.city, `%${search}%`),
              ilike(customers.zip, `%${search}%`),
              sql`lower(concat(${customers.firstName}, ' ', ${
                customers.lastName
              })) LIKE ${`%${search.toLowerCase().replace(" ", "%")}%`}`,
              sql`lower(concat(${customers.lastName}, ' ', ${
                customers.firstName
              })) LIKE ${`%${search.toLowerCase().replace(" ", "%")}%`}`
            )
          : undefined,
        !isUndefined(isCompleted)
          ? eq(tickets.completed, isCompleted)
          : undefined
      )
    )
    .orderBy(asc(tickets.createdAt));

  return results;
};

export type TicketSearchResult = Awaited<ReturnType<typeof getTickets>>;
