"use client";

import {
  Button,
  CheckboxWithLabel,
  Form,
  InputWithLabel,
  SelectWithLabel,
  ServerActionResponse,
  TextareaWithLabel,
} from "@/components";
import { states } from "@/constants";
import { saveCustomerAction } from "@/lib";
import {
  insertCustomerSchema,
  InsertCustomerSchema,
  SelectCustomerSchema,
} from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  customer?: SelectCustomerSchema;
  isManager?: boolean;
};

const newCustomer: InsertCustomerSchema = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  active: true,
};

const CustomerForm: FC<Props> = ({ customer, isManager }) => {
  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");

  const defaultValues: InsertCustomerSchema = useMemo(
    () =>
      hasCustomerId && customer
        ? {
            id: customer?.id,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            address1: customer?.address1,
            address2: customer?.address2 ?? undefined,
            city: customer?.city,
            state: customer?.state,
            zip: customer?.zip,
            phone: customer?.phone,
            email: customer?.email,
            active: customer?.active,
          }
        : newCustomer,
    [customer, hasCustomerId]
  );

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : newCustomer);
  }, [defaultValues, form, hasCustomerId]);

  const {
    executeAsync: executeInsert,
    result: insertResult,
    isPending: isInserting,
    reset: resetInsert,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast.success("Success! 🎉", {
          description: data?.message,
        });
      }
    },
    onError({ error }) {
      const { serverError } = error;

      toast.error("Error!", {
        description: <p>{serverError ?? "Something went wrong!"}</p>,
      });
    },
  });

  const handleSubmit = async (data: InsertCustomerSchema) => {
    await executeInsert(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <ServerActionResponse result={insertResult} />
      <div className="m-2">
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"}&nbsp;Customer&nbsp;
          {customer?.id ? `#${customer.id}` : "Form"}
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
            {isManager && (
              <CheckboxWithLabel<InsertCustomerSchema>
                fieldTitle="Active"
                nameInSchema="active"
                description="Yes"
                disabled={!customer?.id}
              />
            )}
            <div className="flex gap-2 mt-4">
              <Button
                type="submit"
                variant="default"
                title="Save"
                className="w-3/4"
                disabled={isInserting}
              >
                {isInserting ? (
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
                  resetInsert();
                }}
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
