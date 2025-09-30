import { ComponentProps, ReactNode } from "react";
import classnames from "classnames";

export interface TextProps extends ComponentProps<"p"> {
  children?: ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "3xl" | "2xl" | "xl" | "lg" | "base" | "sm" | "xs";
  type?: "normal" | "medium" | "semibold" | "bold";
  variant?: string;
}

const Text = ({
  children,
  className,
  as: Component = "div",
  size = "base",
  variant = "primary",
  type = "normal",
  ...props
}: TextProps) => {
  return (
    <Component
      className={classnames(
        `text-${size}`,
        `font-${type}`,
        `text-${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
