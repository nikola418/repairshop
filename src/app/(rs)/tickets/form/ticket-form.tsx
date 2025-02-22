"use client";

import {
  SelectOptions,
  ServerActionResponse,
  InputWithLabel,
  SelectWithLabel,
  CheckboxWithLabel,
  TextareaWithLabel,
  Button,
  Form,
} from "@/components";
import { saveTicketAction } from "@/lib";
import {
  SelectCustomerSchema,
  SelectTicketSchema,
  InsertTicketSchema,
  insertTicketSchema,
  UpdateTicketSchema,
} from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  customer: SelectCustomerSchema;
  ticket?: SelectTicketSchema;
  isEditable?: boolean;
  techs?: SelectOptions[];
};

const TicketForm: FC<Props> = ({
  customer,
  ticket,
  isEditable = true,
  techs,
}) => {
  const defaultValues: InsertTicketSchema | UpdateTicketSchema = {
    id: ticket?.id,
    customerId: ticket?.customerId || customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "",
  };

  const form = useForm<InsertTicketSchema>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSave,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      toast.success("Success! 🎉", {
        description: data?.message,
      });
    },
    onError() {
      toast.error("Error!", {
        description: "Something went wrong!",
      });
    },
  });

  const onSubmit = async (data: InsertTicketSchema) => {
    executeSave(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <ServerActionResponse result={saveResult} />
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
              disabled={!isEditable}
            />
            <SelectWithLabel<InsertTicketSchema>
              fieldTitle="Technician"
              nameInSchema="tech"
              data={[{ name: "Unassigned", value: "unassigned" }].concat(
                techs ?? []
              )}
              disabled={!isEditable}
            />
            {ticket?.id ? (
              <CheckboxWithLabel<InsertTicketSchema>
                fieldTitle="Completed"
                nameInSchema="completed"
                description="Yes"
                disabled={!isEditable}
              />
            ) : null}

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
              disabled={!isEditable}
            />
            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="default"
                  title="Save"
                  className="w-3/4"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  title="reset"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSave();
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default TicketForm;
