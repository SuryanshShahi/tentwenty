"use client";
import DropdownField from "@/app/shared";
import Button from "@/app/shared/Button";
import CalendarPopup from "@/app/shared/calendarPopup";
import CardWrapper from "@/app/shared/cards/CardWrapper";
import Chip from "@/app/shared/Chip";
import { SvgCross } from "@/app/svgs";
import clsx from "clsx";
import moment from "moment";
import React from "react";
import { FiCalendar } from "react-icons/fi";

const page = () => {
  return (
    <div className="max-w-screen-xl lg:mx-auto border border-secondary !rounded-xl bg-white mx-5 mt-10">
      <div className="px-6 py-5 text-lg font-bold">TimeSheets</div>
      <div className="flex gap-x-3 items-center px-4 py-3 border-t border-t-secondary">
        <div className="relative z-[2]">
          <CalendarPopup
            name="calendar"
            trigger={
              <Button
                variant="secondary"
                btnName={false ? moment().format("DD/MM/YYYY") : "Select Date"}
                size="sm"
                iconFirst
                className="gap-x-2 !font-medium"
                icon={
                  <FiCalendar size={18} className="text-btn-secondary-fg" />
                }
                secondaryIcon={
                  false && (
                    <SvgCross
                      className="order-last mt-[2px] ml-1"
                      height={18}
                      width={18}
                    />
                  )
                }
              />
            }
          />
        </div>
        <DropdownField
          name="dropdown"
          options={[]}
          placeholder="Status"
          value=""
          className={clsx("z-[2] !min-w-[150px]")}
          onChangeDropdown={(e) => {}}
        />
      </div>
      <div
        className={clsx("overflow-x-scroll h-full max-h-[calc(100vh-350px)]")}
      >
        <table className="w-full">
          <thead className="top-0 sticky z-[1] bg-white border-y border-y-secondary">
            <tr
              className={clsx(
                "[&>*]:text-xs bg-secondary [&>*]:text-start [&>*]:font-medium [&>*]:py-3 [&>*]:px-6 [&>*]:text-tertiary"
              )}
            >
              <th>WEEK #</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(null)
              ?.map((_, idx) => (
                <tr
                  className={clsx(
                    "[&>*]:px-6 [&>*]:py-4",
                    idx !== 9 && "border-b border-secondary"
                  )}
                >
                  <td className="w-[100px] bg-[#f8f8f8]">{idx + 1}</td>
                  <td>1 - 5 January, 2024</td>
                  <td>
                    <Chip
                      title={
                        idx % 3
                          ? "Completed"
                          : idx % 5
                          ? "Missing"
                          : "InComplete"
                      }
                      className="!rounded-full !uppercase"
                      variant={
                        idx % 3 ? "success" : idx % 5 ? "error" : "warning"
                      }
                      size="xs"
                    />
                  </td>
                  <td className="w-10">
                    <Button variant="tertiary-color" btnName="View" size="xs" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between border-t border-secondary items-center px-6 py-3">
        <DropdownField
          name="dropdown"
          options={[
            {
              label: "5 per page",
              value: "5",
            },
            {
              label: "10 per page",
              value: "10",
            },
          ]}
          placeholder="5 per page"
          value=""
          className={clsx("!min-w-[100px]")}
          onChangeDropdown={(e) => {}}
        />
        <div className="hidden lg:flex">
          <Button
            variant="secondary"
            btnName="Previous"
            size="xs"
            className="!rounded-r-none"
          />
          {Array(8)
            .fill(null)
            .map((_, idx) => (
              <Button
                variant="secondary"
                btnName={idx.toString()}
                key={idx}
                size="xs"
                className="!rounded-none"
              />
            ))}
          <Button
            variant="secondary"
            btnName="..."
            size="xs"
            className="!rounded-none"
          />
          <Button
            variant="secondary"
            btnName="99"
            size="xs"
            className="!rounded-none"
          />
          <Button
            variant="secondary"
            btnName="Next"
            size="xs"
            className="!rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
