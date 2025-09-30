"use client";
import Button from "@/app/shared/Button";
import CardWrapper from "@/app/shared/cards/CardWrapper";
import Chip from "@/app/shared/Chip";
import Divider from "@/app/shared/Divider";
import ConfirmationModal from "@/app/shared/modal/ConfirmationModal";
import PopOver from "@/app/shared/PopOver";
import { SvgTrash } from "@/app/svgs";
import { useClickOutside } from "@/app/utils/hooks/useClickOutside";
import { tw } from "@/tailwind.config";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import AddEntryModal from "./AddEntryModal";

const page = () => {
  const [isOpen, setIsOpen] = useState("");
  const { isActive, setIsActive, ref } = useClickOutside("");

  return (
    <CardWrapper className="max-w-screen-xl lg:mx-auto my-10 mx-5">
      <div className="space-y-4">
        <div className="sm:text-3xl text-2xl font-bold">
          This week's timesheet
        </div>
        <div className="text-tertiary text-sm">21 - 26 January, 2025</div>
      </div>
      <div className="space-y-4">
        {Array(4)
          .fill(null)
          .map((_, dayIdx) => (
            <div key={dayIdx}>
              <div className="flex md:flex-row flex-col md:gap-x-6 items-center mt-6">
                <div className="px-6 py-5 font-medium w-[150px] text-lg md:text-start text-center">
                  Jan 21
                </div>
                <div className="space-y-2 w-full">
                  {Array(2)
                    .fill(null)
                    .map((_, taskIdx) => (
                      <div
                        className="flex items-center justify-between p-4 rounded-2xl border border-secondary w-full"
                        key={taskIdx}
                      >
                        <div className="font-medium sm:text-base text-xs">
                          Homepage Development
                        </div>
                        <div className="flex items-center gap-x-4">
                          <div className="text-tertiary sm:text-sm text-xs">
                            4 hrs
                          </div>
                          <Chip
                            title="Project Name"
                            className="sm:text-sm text-xs"
                          />

                          <div className="relative">
                            <BsThreeDots
                              size={20}
                              className="text-secondary cursor-pointer"
                              onClick={() =>
                                setIsActive(
                                  `${dayIdx}-${taskIdx}` === isActive
                                    ? ""
                                    : `${dayIdx}-${taskIdx}`
                                )
                              }
                            />
                            {isActive === `${dayIdx}-${taskIdx}` && (
                              <PopOver
                                menuItems={[
                                  {
                                    icon: (
                                      <FaEdit
                                        className="cursor-pointer text-brand-tertiary"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setIsActive("");
                                          setIsOpen("EDIT_MODAL");
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={() => {}}
                                      />
                                    ),
                                    text: "Edit",
                                    onClick: () => {
                                      setIsActive("");
                                      setIsOpen("EDIT_MODAL");
                                    },
                                  },
                                  {
                                    icon: (
                                      <SvgTrash
                                        stroke={tw.textColor["error-primary"]}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setIsActive("");
                                          setIsOpen("DELETE_MODAL");
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={() => {}}
                                      />
                                    ),
                                    text: "Delete",
                                    onClick: () => {
                                      setIsActive("");
                                      setIsOpen("DELETE_MODAL");
                                    },
                                  },
                                ]}
                                className="animate-fadeIn w-[150px] text-black absolute"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  <Button
                    btnName="Add new task"
                    icon={<FiPlus className="text-blue-500" />}
                    iconFirst
                    className="!bg-blue-100 !border-blue-500"
                    styleBtnName="!text-blue-500"
                    fullWidth
                    onClick={() => setIsOpen("ADD_ENTRY")}
                  />
                </div>
              </div>
              {dayIdx !== 3 && <Divider />}
            </div>
          ))}
      </div>
      <ConfirmationModal
        title="Remove Entry"
        description="Are you sure you want to remove this entry"
        onSubmit={() => {}}
        styleHeader="flex gap-x-4 !space-y-0"
        rightBtnName="Yes, Remove"
        isLoading={false}
        leftBtnName="Back"
        type="danger"
        isOpen={isOpen === "DELETE_MODAL"}
        size="md"
        close={() => setIsOpen("")}
      />
      <AddEntryModal isOpen={isOpen} close={() => setIsOpen("")} />
    </CardWrapper>
  );
};

export default page;
