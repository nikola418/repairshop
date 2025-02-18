"use client";

import InputWithLabel from "@/components/inputs/input-with-label";
import SelectWithLabel from "@/components/inputs/select-with-label";
import TextareaWithLabel from "@/components/inputs/textarea-with-label";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { states } from "@/constants/states";
import {
  insertCustomerSchema,
  InsertCustomerSchema,
  SelectCustomerSchema,
} from "@/zod-schemas/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
  customer?: SelectCustomerSchema;
};

const CustomerForm: FC<Props> = ({ customer }) => {
  const defaultValues: InsertCustomerSchema = {
    id: customer?.id || 0,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    address1: customer?.address1 || "",
    address2: customer?.address2 || "",
    city: customer?.city || "",
    state: customer?.state || "",
    zip: customer?.zip || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
  };

  const form = useForm<InsertCustomerSchema>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const handleSubmit = (data: InsertCustomerSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div className="m-2">
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:justify-center md:items-start"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="firstName"
              fieldTitle="First Name"
              placeholder="John"
            />
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="lastName"
              fieldTitle="Last Name"
              placeholder="Doe"
            />
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="address1"
              fieldTitle="Address 1"
              placeholder="Address 1"
            />
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="address2"
              fieldTitle="Address 2"
              placeholder="Address 2"
            />
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="city"
              fieldTitle="City"
              placeholder="New York"
            />
            <SelectWithLabel<InsertCustomerSchema>
              fieldTitle="State"
              nameInSchema="state"
              data={states}
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="zip"
              fieldTitle="Zip Code"
              placeholder="11000"
            />
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="email"
              fieldTitle="Email"
              placeholder="john.doe@example.com"
            />
            <InputWithLabel<InsertCustomerSchema>
              nameInSchema="phone"
              fieldTitle="Phone"
              placeholder="062-000-0000"
            />
            <TextareaWithLabel<InsertCustomerSchema>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />
            <div className="flex gap-2 mt-4">
              <Button
                type="submit"
                variant="default"
                title="Save"
                className="w-3/4"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerForm;
