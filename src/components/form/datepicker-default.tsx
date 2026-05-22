/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, ReactNode } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LabelDefault from "./label-default"
import FieldError from "./field-error"

type DatepickerDefaultProps = CalendarProps & {
  id?: string;
  label?: string | ReactNode;
  placeholder?: string;
  description?: string | ReactNode;
  error?: string;
  required?: boolean;
  selected?: any;
}

const DatepickerDefault: FC<DatepickerDefaultProps> = ({ label, placeholder, error, id, disabled, mode, selected, required, ...props }) => (
  <div className='space-y-1 leading-none font-fira-sans-condensed'>

    {label && <LabelDefault htmlFor={id} label={label} required={required} /> }

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          disabled={!!disabled}
          className={cn(
            "flex items-center gap-2",
            "file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border bg-transparent",
            "px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:h-7 file:border-0 file:bg-transparent file:text-sm",
            "file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          )}
        >
          <CalendarIcon size={"16"} className='stroke-neutral-700' />
          {selected ?
            <>
              {mode === "single" && format(selected, "PPP")}
              {mode === "range" &&
                  (selected?.from && (
                    selected.to ? (
                      <>
                        {format(selected.from, "LLL dd, y")} -{" "}
                        {format(selected.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(selected.from, "LLL dd, y")
                    )
                  ))
              }
            </>
            :
            <span className='text-neutral-500'>{placeholder}</span>
          }
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-auto p-0'>
        <Calendar
          mode={mode as any}
          disabled={disabled}
          selected={selected}
          {...props}
        />
      </DropdownMenuContent>
    </DropdownMenu>

    <FieldError error={error} />

  </div>
)

export default DatepickerDefault;
