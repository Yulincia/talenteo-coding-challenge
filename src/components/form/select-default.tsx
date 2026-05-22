import type { FC, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SelectProps } from "@radix-ui/react-select";
import clsx from "clsx";
import Label from "./label-default";
import FieldError from "./field-error";

interface SelectDefaultProps extends SelectProps {
    options: { value: string; label: string }[];
    id?: string;
    label?: string | ReactNode;
    error?: string;
    placeholder?: string;
    className?: string;
}

const SelectDefault: FC<SelectDefaultProps> = ({ options, label, error, placeholder, className, ...props }) => {
  const form = useFormContext() ?? {};
  let formError;
  if (form && props.name)
  {formError = form.formState.errors[ props.name ];}

  return (
    <div className={`${className ?? ""} space-y-1 leading-none`}>

      {label && <Label htmlFor={props.id ?? props.name} label={label} required={props.required} /> }

      <ShadcnSelect {...props}>
        <SelectTrigger
          id={props.id ?? props.name}
          name={props.name}
          className={
            clsx("w-full", {
              "border-red-700 focus:border-red-700" : !!error || !!formError,
            })
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>

      <FieldError name={props.name} error={error} />

    </div>
  );
}

export default SelectDefault;
