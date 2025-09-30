import clsx from "clsx";
import React, { InputHTMLAttributes, ReactNode } from "react";
interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  wrapperClass?: string;
  icon?: ReactNode;
  errorMessage?: string;
}
const InputField = ({
  label,
  className,
  wrapperClass,
  errorMessage,
  icon,
  ...rest
}: IInputField) => {
  return (
    <div className={clsx("flex flex-col gap-y-1", wrapperClass)}>
      {label && <label className="text-secondary text-sm">{label}</label>}
      <div className="relative">
        <input
          className={clsx(
            "h-11 rounded-md border bg-gray-100 border-gray-100 p-3 outline-none",
            icon && "pr-10",
            className
          )}
          {...rest}
        />
        <div className="absolute right-3 top-3">{icon}</div>
      </div>
      {errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
