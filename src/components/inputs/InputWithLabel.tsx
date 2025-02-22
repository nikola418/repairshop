"use client";

import { isUndefined } from "lodash";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: HTMLInputElement["className"];
  description?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWithLabel = <S,>({
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
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>
          {!isUndefined(description) && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { InputWithLabel };
