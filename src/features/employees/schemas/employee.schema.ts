import { z } from "zod"

export const employeeSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  registratonNumber: z.coerce.number().int().positive(),
  email: z.email("Please enter a valid email"),
  dateOfBirth: z.string().min(1, "This field is required"),
  gender: z.string().min(1, "This field is required"),
  jobTitle: z.string().min(1, "This field is required"),
  department: z.string().min(1, "This field is required"),
})

export type EmployeeSchema = z.infer<typeof employeeSchema>
