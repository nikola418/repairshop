"use client";

import { isUndefined } from "lodash";
import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: HTMLTextAreaElement["className"];
  description?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaWithLabel = <S,>({
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
            <Textarea
              id={nameInSchema}
              className={`${className}`}
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

export { TextareaWithLabel };
