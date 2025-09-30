import React, { ReactNode } from "react";
import clsx from "clsx";

const PopOver = ({
  menuItems,
  className,
  close,
}: {
  menuItems: {
    id?: string;
    text?: string;
    icon?: ReactNode;
    onClick?: (val: string) => void;
  }[];
  className?: string;
  close?: () => void;
}) => {
  return (
    <div
      className={clsx(
        "p-1 max-w-[175px] text-nowrap rounded-lg gap-x-1 prevent-select shadow-sm text-sm bg-white z-10 absolute right-0",
        className
      )}
    >
      {menuItems?.map((item, idx) => (
        <div
          key={`${item?.id}-${idx}`}
          className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-btn-secondary-hover cursor-pointer"
          onClick={(event) => {
            event?.stopPropagation();
            item?.onClick?.(item?.id as string);
            close?.();
          }}
          onKeyDown={() => {}}
          role="button"
        >
          {item?.icon}
          {item?.text}
        </div>
      ))}
    </div>
  );
};

export default PopOver;
