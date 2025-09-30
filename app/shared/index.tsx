"use client";
/* eslint-disable react/no-unstable-nested-components */
import classNames from "classnames";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";

export interface OptionCore {
  value: string;
  label: ReactNode;
}
export interface Option extends OptionCore {
  icon?: ReactNode;
  isFixed?: boolean;
}

interface DropdownFieldProps {
  name: string;
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  max?: number | null;
  onChangeDropdown?: (value: any) => void;
  isDisabled?: boolean;
  emptyMessage?: string;
  removeCat?: boolean;
  image?: string;
  isClearable?: boolean;
  styles?: StylesConfig<Option, boolean>;
  isSearch?: boolean;
  className?: string;
  value?: any;
  onChange?: (value?: any[]) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  name,
  options,
  placeholder = "Select...",
  isMulti = false,
  max = null,
  onChangeDropdown = () => {},
  isDisabled = false,
  emptyMessage,
  removeCat,
  image,
  isClearable,
  styles = {},
  isSearch = true,
  className,
  value,
  onChange,
}) => {
  const [lostFocus, setLostFocus] = useState(true);
  const onFocus = () => setLostFocus(false);
  const onBlur = () => setLostFocus(true);

  const checkValueExists = (value: string, options: Option[]) => {
    const isExist =
      options && options.length > 0
        ? options.find((el) => el.value === value)
        : null;
    return isExist ?? null;
  };

  const getValueWithFixed = (isMulti: boolean, options: Option[]) => {
    if (isMulti) {
      if (value !== null && value !== "" && value !== undefined) {
        const arr =
          value.length > 0
            ? value.map((item: Option) => {
                const available = checkValueExists(item.value, options);
                if (available) {
                  return {
                    ...item,
                    value: available.value,
                    label: available.label,
                    icon: available.icon,
                  };
                }
                return "";
              })
            : [];
        return arr;
      }
    }
    const available =
      value !== null && value !== ""
        ? checkValueExists(value.value, options)
        : false;

    if (available) {
      return {
        ...value,
        value: available.value,
        label: available.label,
        icon: available.icon,
      };
    }
    return null;
  };

  const getRef = useRef<any>(null);

  useEffect(() => {
    if (removeCat && getRef.current.props.name === "category") {
      getRef.current.select.clearValue();
    }
  }, [getRef, removeCat]);

  const onChangeValue = (newValue: any, actionMeta: ActionMeta<Option>) => {
    if (
      actionMeta.action === "remove-value" ||
      actionMeta.action === "pop-value"
    ) {
      if (
        styles?.multiValueRemove !== undefined &&
        actionMeta?.removedValue?.isFixed
      )
        return;
    }
    if (isMulti) {
      const value = newValue.map((v: Option) => v);
      (onChange || (() => {}))(value.length > 0 ? value : []);
    } else {
      (onChange || (() => {}))(newValue);
    }
    if (onChangeDropdown) {
      onChangeDropdown(newValue);
    }
  };

  return (
    <div
      className={classNames(
        "app-select-wrapper min-h-10 min-w-[200px] text-base relative",
        className,
        image && "app-select-with-image"
      )}
      role="presentation"
    >
      {image && (
        <Image
          width={20}
          height={20}
          src={image}
          alt=""
          className="absolute left-3 z-10 top-[10px]"
        />
      )}
      <Select
        ref={getRef}
        styles={styles}
        menuPlacement="auto"
        minMenuHeight={300}
        maxMenuHeight={220}
        className={classNames(
          "dropdown-container placeholder:text-base placeholder:!text-placeholder capitalize block w-full text-base border border-primary rounded-lg focus-within:outline-none",
          (!lostFocus && "!border-brand") || "",
          "shadow-none disabled:bg-disabled"
        )}
        classNamePrefix="app-select"
        isMulti={isMulti}
        isDisabled={isDisabled}
        isClearable={isClearable || false}
        placeholder={placeholder}
        options={max !== null && value && value.length >= max ? [] : options}
        noOptionsMessage={() =>
          max !== null && value && value.length >= max
            ? `You can select up to ${max} options only`
            : emptyMessage || "No options available"
        }
        getOptionLabel={(option) =>
          typeof option.label === "string" ? option.label : String(option.value)
        }
        formatOptionLabel={(option) =>
          isSearch === false ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              {option.icon}
              <span style={{ marginLeft: 8 }}>{option.label}</span>
            </div>
          ) : (
            option.label
          )
        }
        getOptionValue={(option) => option.value}
        onChange={(val, action) => {
          onChangeValue(val, action);
        }}
        defaultValue={getValueWithFixed(isMulti, options)}
        value={getValueWithFixed(isMulti, options)}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
      />
      <div className="absolute inset-y-0 flex items-center pointer-events-none right-10" />
      {/* {error && lostFocus && (
        <p id={`${name}-error`} className='fp-input-error text-xs mt-2'>
          {error.message}
        </p>
      )} */}
    </div>
  );
};

export default DropdownField;
