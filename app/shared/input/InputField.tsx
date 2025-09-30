import clsx from "clsx";
import { InputHTMLAttributes, ReactNode, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    rest?.type === "password" && showPassword ? "text" : rest?.type;

  return (
    <div className={clsx("flex flex-col gap-y-1", wrapperClass)}>
      {label && <label className="text-secondary text-sm">{label}</label>}
      <div className="relative">
        <input
          className={clsx(
            "h-11 rounded-md border bg-gray-100 border-gray-100 p-3 outline-none",
            (icon || rest?.type === "password") && "pr-10",
            className
          )}
          {...rest}
          type={inputType}
        />
        <div className="absolute right-3 top-3">
          {rest?.type === "password" ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          ) : (
            icon
          )}
        </div>
      </div>
      {errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
