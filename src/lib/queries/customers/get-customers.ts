"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or } from "drizzle-orm";

export const getCustomers = async (search: string) => {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
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
    );

  return results;
};
