"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";
import { isUndefined } from "lodash";

export const getCustomers = async ({ search }: { search?: string }) => {
  const results = await db
    .select()
    .from(customers)
    .where(
      !isUndefined(search)
        ? or(
            ilike(customers.email, `%${search}%`),
            ilike(customers.phone, `%${search}%`),
            ilike(customers.address1, `%${search}%`),
            ilike(customers.address2, `%${search}%`),
            ilike(customers.city, `%${search}%`),
            ilike(customers.state, `%${search}%`),
            ilike(customers.zip, `%${search}%`),
            ilike(customers.notes, `%${search}%`),
            sql`lower(concat(${customers.firstName}, ' ', ${
              customers.lastName
            })) LIKE ${`%${search.toLowerCase().replace(" ", "%")}%`}`,
            sql`lower(concat(${customers.lastName}, ' ', ${
              customers.firstName
            })) LIKE ${`%${search.toLowerCase().replace(" ", "%")}%`}`
          )
        : undefined
    )
    .orderBy(customers.firstName);

  return results;
};
