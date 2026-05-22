import { type ComponentProps, type FC, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import LabelDefault from "./label-default";
import FieldError from "./field-error";

interface InputDefaultProps extends Omit<ComponentProps<"input">, "prefix"> {
  label?: string | ReactNode;
  error?: string;
}

const InputDefault: FC<InputDefaultProps> = ({ label, error, className, ...props }) => {

  const form = useFormContext() ?? {};
  let formError;
  if (form && props.name) { formError = form.formState.errors[ props.name ]; }

  return (
    <div className={`${className ?? ""} space-y-1 leading-none`}>

      {label && <LabelDefault htmlFor={props.id ?? props.name} label={label} required={props.required} /> }

      <Input
        id={props.id ?? props.name}
        className={`${!!error || !!formError ? "border-red-700!": ""}`}
        {...props}
      />

      <FieldError name={props.name} error={error} />

    </div>
  );
}

export default InputDefault;
