/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentProps } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type UseFormProps,
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { ZodType } from "zod";

interface UseZodFormProps<T extends ZodType<any>>
	extends UseFormProps<any> {
	schema: T;
}

export const useZodForm = ({
  schema,
  ...formConfig
}: UseZodFormProps<any>) => useForm({
  ...formConfig,
  resolver: zodResolver(schema),
});

interface Props<T extends FieldValues = any>
	extends Omit<ComponentProps<"form">, "onSubmit"> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: Props<T>) => (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <fieldset
          className={`space-y-4 ${className ?? ""}`}
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
        {form.formState.errors.root?.message &&
          <div className='text-red-700 text-sm font-semibold mt-2 text-center'>
            {form.formState.errors.root?.message}
          </div>
        }
      </form>
    </FormProvider>
  );
