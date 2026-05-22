import type { FC, ReactNode } from "react";

interface LabelProps {
  label: string | ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
}

const LabelDefault: FC<LabelProps> = ({ label, htmlFor, className, required }) => (
  <label
    htmlFor={htmlFor}
    className={`${className ?? ""} text-sm font-bold`}
  >
    {label} {required && "*"}
  </label>
)

export default LabelDefault;
