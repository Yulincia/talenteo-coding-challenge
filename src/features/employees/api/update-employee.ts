import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

import { getEmployeesQueryOptions } from "./get-employees";
import type { EmployeeSchema } from "../schemas/employee.schema";
import type { Employee } from "../types/employee.type";

export type UpdateEmployeeInput = EmployeeSchema;

export const updateEmployee = ({
  data,
  employeeId,
}: {
  data: UpdateEmployeeInput;
  employeeId: string;
}): Promise<Employee> => api.patch(`/employees/${employeeId}`, data);

type UseUpdateEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof updateEmployee>;
};

export const useUpdateEmployee = ({
  mutationConfig,
}: UseUpdateEmployeeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getEmployeesQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateEmployee,
  });
};
