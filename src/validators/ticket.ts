import { tickets } from "@/db/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const insertTicketSchema = createInsertSchema(tickets, {
  title: (schema) => schema.min(1, "Title is required!"),
  description: (schema) => schema.min(1, "Description is required!"),
  tech: (schema) => schema.email("Invalid email address!"),
});

export const selectTicketSchema = createSelectSchema(tickets);
export const updateTicketSchema = createUpdateSchema(tickets);

export type InsertTicketSchema = typeof insertTicketSchema._type;
export type SelectTicketSchema = typeof selectTicketSchema._type;
export type UpdateTicketSchema = typeof updateTicketSchema._type;
