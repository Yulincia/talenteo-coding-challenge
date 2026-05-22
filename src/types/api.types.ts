export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export interface IQuery {
  search?: string;
  limit?: number; // Number of records per page
  page?: number; // Current page number
  // sortBy?: string; // Field to sort by
  // order?: string; // Sorting order (asc/desc)
}
