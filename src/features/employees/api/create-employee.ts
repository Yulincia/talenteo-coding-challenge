import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

import { getEmployeesQueryOptions } from "./get-employees";
import type { Entity } from "@/types/api.types";
import type { Employee } from "../types/employee.type";
import type { EmployeeSchema } from "../schemas/employee.schema";

export type CreateEmployeeInput = EmployeeSchema;

export const createEmployee = ({
  data,
}: {
  data: CreateEmployeeInput;
}): Promise<Entity<Employee>> => api.post("/employees", data);

type UseCreateEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof createEmployee>;
};

export const useCreateEmployee = ({
  mutationConfig,
}: UseCreateEmployeeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEmployee,
  });
};
