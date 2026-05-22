import type { FC, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface FieldErrorProps {
  error?: string | ReactNode;
	name?: string;
}

const FieldError: FC<FieldErrorProps> = ({ error, name }) => {
  const form = useFormContext() ?? {};

  if (!error && (!name || !form)) {return null;}

  let formError;
  if (form && name)
  {formError = form.formState.errors[ name ];}

  if (!formError && !error ) {return null;}

  return (
    <div className='text-xs text-red-700'>{formError?.message?.toString() ?? error}</div>
  );
}

export default FieldError;
