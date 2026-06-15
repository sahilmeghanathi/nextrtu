"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  placeholder?: string;
  description?: string;

  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;

  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function CustomInput<T extends FieldValues>({
  control,
  name,

  label,
  placeholder,
  description,

  type = "text",
  disabled,
  required,

  containerClassName,
  labelClassName,
  inputClassName,
}: CustomInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(containerClassName)}>
          {label && (
            <FormLabel className={cn(labelClassName)}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(inputClassName)}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
