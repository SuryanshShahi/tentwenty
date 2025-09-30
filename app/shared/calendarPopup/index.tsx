import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CalendarPopupProps {
  name: string;
  maxDate?: Date;
  minDate?: Date;
  showMonthYearPicker?: boolean;
  onChangeProps?: (date: Date) => void;
  className?: string;
  disabledDates?: Date[];
  value?: any;
  trigger?: any;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  name,
  maxDate,
  minDate,
  onChangeProps,
  className,
  disabledDates,
  value,
  trigger,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to control popup visibility
  const calendarRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks
  const triggerRef = useRef<HTMLDivElement>(null); // Ref for the trigger element

  const onDateChange = (date: any) => {
    setIsOpen(false);
    onChangeProps?.(date);
    // onChange(date);
  };

  const disableDays = ({ date }: { date: Date }) => {
    return disabledDates
      ? disabledDates?.some((disabledDate) =>
          moment(date).isSame(disabledDate, "day")
        )
      : false;
  };

  const formatShortWeekday = (locale: string | undefined, date: Date) => {
    // Get the short weekday name (e.g., "Mon", "Tue")
    const shortWeekday = date.toLocaleDateString(locale, { weekday: "short" });
    // Map to custom two-letter abbreviations
    const customWeekdays: Record<string, string> = {
      Mon: "Mo",
      Tue: "Tu",
      Wed: "We",
      Thu: "Th",
      Fri: "Fr",
      Sat: "Sa",
      Sun: "Su",
    };
    // Return the custom abbreviation or default to the original short name
    return customWeekdays[shortWeekday] || shortWeekday;
  };

  // Handle click outside to close popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef, triggerRef]);

  return (
    <div className="inline-block">
      {/* External trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => {}}
        role="button"
      >
        {trigger}
      </div>

      {/* Calendar popup */}
      {isOpen && (
        <div
          ref={calendarRef}
          className="calendarPopup absolute z-50 bg-white shadow-lg rounded-md"
        >
          <Calendar
            locale="en"
            onChange={onDateChange}
            value={value}
            className="p-2"
            formatShortWeekday={formatShortWeekday}
            formatMonth={(locale, date) =>
              date.toLocaleDateString(locale, { month: "short" })
            }
            nextLabel={<IoIosArrowForward />}
            prevLabel={<IoIosArrowBack />}
            maxDate={maxDate}
            minDate={minDate}
            tileDisabled={disableDays}
            {...rest}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPopup;
