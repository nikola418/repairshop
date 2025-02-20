import { customers } from "@/db/schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required!"),
  lastName: (schema) => schema.min(1, "Last name is required!"),
  address1: (schema) => schema.min(1, "Address name is required!"),
  city: (schema) => schema.min(1, "City is required!"),
  state: (schema) => schema.length(2, "State must be exactly 2 characters!"),
  email: (schema) => schema.email("Invalid email address!"),
  zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid Zip code!"),
  phone: (schema) =>
    schema.regex(
      /^\d{3}-\d{3}-\d{4}$/, //* :'DD VOIMJA OCA
      "Invalid phone number format! Use XXX-XXX-XXXX"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);
export const updateCustomerSchema = createUpdateSchema(customers).omit({
  id: true,
});

export type InsertCustomerSchema = typeof insertCustomerSchema._type;
export type SelectCustomerSchema = typeof selectCustomerSchema._type;
export type UpdateCustomerSchema = typeof updateCustomerSchema._type;
