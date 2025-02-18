"use client";

import { isUndefined } from "lodash";
import { SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectContent = {
  name: string;
  value: string;
};

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: SelectContent[];
  className?: HTMLSelectElement["className"];
  description?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectWithLabel = <S,>({
  fieldTitle,
  nameInSchema,
  data,
  className,
  description,
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
          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={`w-full max-w-xs ${className}`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => (
                <SelectItem
                  key={`${nameInSchema}_${item.value}`}
                  value={item.value}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!isUndefined(description) && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithLabel;
