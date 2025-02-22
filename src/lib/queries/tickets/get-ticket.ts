"use server";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { first } from "lodash";

export const getTicket = async (id: number) => {
  const ticket = await db.select().from(tickets).where(eq(tickets.id, id));

  return first(ticket);
};
