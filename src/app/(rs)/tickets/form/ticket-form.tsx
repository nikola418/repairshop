"use client";

import CheckboxWithLabel from "@/components/inputs/checkbox-with-label";
import InputWithLabel from "@/components/inputs/input-with-label";
import TextareaWithLabel from "@/components/inputs/textarea-with-label";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectCustomerSchema } from "@/zod-schemas/customer";
import {
  insertTicketSchema,
  InsertTicketSchema,
  SelectTicketSchema,
} from "@/zod-schemas/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
  customer: SelectCustomerSchema;
  ticket?: SelectTicketSchema;
};

const TicketForm: FC<Props> = ({ customer, ticket }) => {
  const defaultValues: InsertTicketSchema = {
    id: ticket?.id || 0,
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm<InsertTicketSchema>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const onSubmit = (data: InsertTicketSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? `Edit Ticket #${ticket.id}` : `New Ticket Form`}
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:justify-center md:items-start"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketSchema>
              fieldTitle="Title"
              nameInSchema="title"
            />
            <InputWithLabel<InsertTicketSchema>
              fieldTitle="Technician"
              nameInSchema="tech"
              disabled
              readOnly
            />
            <CheckboxWithLabel<InsertTicketSchema>
              fieldTitle="Completed"
              nameInSchema="completed"
              description="Yes"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextareaWithLabel<InsertTicketSchema>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
            />

            <div className="flex gap-2">
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
export default TicketForm;
