
import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { type QueryConfig, queryConfig as config } from "@/lib/react-query";
import type { Entity, IQuery } from "@/types/api.types";
import type { Employee } from "../types/employee.type";

export const getEmployees = (params?: IQuery): Promise<Entity<Employee>[]> => api.get("/employees", { params });

export const getEmployeesQueryOptions = (params?: IQuery) => queryOptions({
  queryKey: params ? ["employees", params] : ["employees"],
  queryFn: () => getEmployees(params),
});

type UseEmployeesOptions = {
  queryConfig?: QueryConfig<typeof getEmployeesQueryOptions>;
};

export const useEmployees = ({ queryConfig = config.queries, limit, page, search }: UseEmployeesOptions & IQuery) => useQuery({
  ...getEmployeesQueryOptions({ limit, page, search }),
  ...queryConfig,
});
