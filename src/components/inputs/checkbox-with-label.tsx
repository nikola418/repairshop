"use client";

import { CheckboxProps } from "@radix-ui/react-checkbox";
import { isUndefined } from "lodash";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: HTMLInputElement["className"];
  description?: string;
} & CheckboxProps;

const CheckboxWithLabel = <S,>({
  fieldTitle,
  nameInSchema,
  className,
  description,
  ...props
}: Props<S>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex items-center gap-2">
          <FormLabel className="text-base w-1/3" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                id={nameInSchema}
                checked={field.value}
                className={`${className}`}
                {...props}
                {...field}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          {!isUndefined(description) && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxWithLabel;
