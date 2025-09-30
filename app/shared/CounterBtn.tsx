import clsx from "clsx";
import { FiPlus } from "react-icons/fi";
import { HiOutlineMinusSm } from "react-icons/hi";
import Button from "./Button";

const CounterBtn = ({
  add,
  remove,
  value,
  status,
  className,
}: {
  add: () => void;
  remove: () => void;
  value: number;
  status?: string;
  className?: string;
}) => {
  const btnConfig =
    value === 0
      ? {
          btnName: "Add",
          icon: <FiPlus size={16} className="text-brand-tertiary" />,
          iconFirst: true,
          onClick: add,
        }
      : {
          btnName: "",
          icon: null,
          iconFirst: true,
          onClick: () => {},
        };
  return (
    <Button
      btnName={btnConfig.btnName}
      variant="secondary"
      styleBtnName="!text-brand-tertiary"
      size="xs"
      className={clsx("!py-2", className)}
      icon={btnConfig.icon}
      iconFirst={btnConfig.iconFirst}
      onClick={btnConfig.onClick}
    >
      {value !== 0 && (
        <>
          <HiOutlineMinusSm
            className={clsx(
              value === 0
                ? "text-disabled cursor-not-allowed"
                : "cursor-pointer text-brand-tertiary"
            )}
            size={18}
            onClick={remove}
          />
          <div className="min-w-5 text-center">{value}</div>
          <FiPlus
            className={clsx(
              status === "full"
                ? "text-disabled cursor-not-allowed"
                : "cursor-pointer text-brand-tertiary"
            )}
            size={18}
            onClick={status === "full" ? () => {} : () => add()}
          />
        </>
      )}
    </Button>
  );
};

export default CounterBtn;
