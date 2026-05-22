/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import type z from "zod";
import { IconLoader } from "@tabler/icons-react";
import type { Entity } from "@/types/api";
import type { Employee } from "../types/employee.type";
import { employeeSchema } from "../schemas/employee.schema";
import { Form, useZodForm } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import InputDefault from "@/components/form/input-default";
import SelectDefault from "@/components/form/select-default";
import DatepickerDefault from "@/components/form/datepicker-default";
import { toast } from "sonner";
import { useUpdateEmployee } from "../api/update-employee";
import { useCreateEmployee } from "../api/create-employee";

interface EmployeeFormProps {
    employee?: Entity<Employee>;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ employee }) => {

  const createEmployeeMutation = useCreateEmployee({
    mutationConfig: {
      onSuccess: () => {
        toast.info("Employee created")
      },
    },
  });

  const updateEmployeeMutation = useUpdateEmployee({
    mutationConfig: {
      onSuccess: () => {
        toast.info("Employee updated")
      },
    },
  });

  const form = useZodForm({
    schema: employeeSchema,
    mode: "all",
    defaultValues: employee,
  });

  const handleEmployeeForm = async (data: z.infer<typeof employeeSchema>) => {
    try {
      if (employee && employee.id) {
        updateEmployeeMutation.mutate({
          data,
          employeeId: employee.id,
        })
      } else {
        createEmployeeMutation.mutate({ data })
      }
    } catch (error: any) {
      form.setError("root", { message: error.error ?? error.message })
    }
  }

  return (
    <Form
      form={form}
      onSubmit={handleEmployeeForm}
    >

      <InputDefault
        label="First name"
        placeholder="First name"
        {...form.register("firstName")}
        required
      />

      <InputDefault
        label="Last name"
        placeholder="Last name"
        {...form.register("lastName")}
        required
      />

      <InputDefault
        label="Registration number"
        placeholder="Registration number"
        {...form.register("registratonNumber")}
        required
      />

      <InputDefault
        label="Email"
        placeholder="Email"
        {...form.register("email")}
        required
      />

      <InputDefault
        label="Job title"
        placeholder="Job title"
        {...form.register("jobTitle")}
        required
      />

      <InputDefault
        label="Department"
        placeholder="Department"
        {...form.register("department")}
        required
      />

      <DatepickerDefault
        label="Date of birth"
        placeholder="Date of birth"
        mode='single'
        selected={form.watch("dateOfBirth")}
        onSelect={(date) => form.setValue("dateOfBirth", date.toISOString(), { shouldValidate: true })}
        error={form.formState.errors?.dateOfBirth?.message as string}
        {...form.register("dateOfBirth", { required: true })}
        required
      />

      <SelectDefault
        label="Gender"
        placeholder="Gender"
        defaultValue={form.formState.defaultValues?.gender}
        options={[
          { label:"Male", value:"male" },
          { label:"Female", value:"female" },
        ]}
        onValueChange={(value) => form.setValue("gender", value, { shouldValidate: true })}
        error={form.formState.errors?.gender?.message as string}
        {...form.register("gender", { required: true })}
        required
      />

      <Button
        type='submit'
        className="w-full"
        disabled={
          form.formState.isSubmitting ||
            !form.formState.isValid ||
            createEmployeeMutation.isPending ||
            updateEmployeeMutation.isPending
        }
      >
        {form.formState.isSubmitting || createEmployeeMutation.isPending || updateEmployeeMutation.isPending ?
          <IconLoader className="animate-spin" />
          : "Save"
        }
      </Button>

    </Form>
  )
}

export default EmployeeForm;
