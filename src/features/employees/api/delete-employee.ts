import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

import { getEmployeesQueryOptions } from "./get-employees";

export type DeleteEmployeeDTO = {
  employeeId: string;
};

export const deleteEmployee = ({ employeeId }: DeleteEmployeeDTO) => api.delete(`/employees/${employeeId}`);

type UseDeleteEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof deleteEmployee>;
};

export const useDeleteEmployee = ({
  mutationConfig,
}: UseDeleteEmployeeOptions = {}) => {
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
    mutationFn: deleteEmployee,
  });
};
