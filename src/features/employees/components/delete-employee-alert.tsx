import { useState, type FC } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteEmployee } from "../api/delete-employee";
import { IconLoader, IconTrash } from "@tabler/icons-react";

interface DeleteEmployeeAlertProps {
    employeeId: string;
}

const DeleteEmployeeAlert: FC<DeleteEmployeeAlertProps> = ({ employeeId }) => {
  const [open, setOpen] = useState(false);
  const deleteEmployeeMutation = useDeleteEmployee({
    mutationConfig: {
      onSuccess: () => {
        toast.info("Employee deleted")
      },
      onSettled: () => {
        setOpen(false)
      },
    },
  });

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger onClick={() => setOpen(true)} className='p-1 rounded hover:bg-neutral-100 cursor-pointer'>
        <IconTrash className='text-red-700 size-5' />
      </AlertDialogTrigger>

      <AlertDialogContent onEscapeKeyDown={() => setOpen(false)}>

        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the instance from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            disabled={deleteEmployeeMutation.isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteEmployeeMutation.mutate({ employeeId })}
            disabled={deleteEmployeeMutation.isPending}
            className="w-32"
          >
            {deleteEmployeeMutation.isPending ?
              <IconLoader className="animate-spin" />
              :
              "Confirm"
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteEmployeeAlert;
