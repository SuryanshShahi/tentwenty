"use client";
import Img from "@/app/shared/Img";
import { SvgLogout } from "@/app/svgs";
import { tw } from "@/tailwind.config";
import { useState } from "react";
import UserCard from "../shared/cards/UserCard";
import ConfirmationModal from "../shared/modal/ConfirmationModal";
import PopOver from "../shared/PopOver";
import { useClickOutside } from "../utils/hooks/useClickOutside";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState("");
  const { isActive, setIsActive, ref } = useClickOutside(false);
  return (
    <>
      <nav className="bg-white px-6 py-4">
        <div className="max-w-screen-xl mx-auto relative flex items-center justify-between">
          <div className="flex items-center gap-x-10">
            <Img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwXSnP5bZfgBemXvPqggqweAcc-DhH28PW3g&s"
              height={40}
              width={70}
              alt="logo"
              isLocal
              className="h-[40px] object-contain scale-125"
            />
            <div className="font-semibold">Timesheets</div>
          </div>
          <div ref={ref}>
            <UserCard
              title="John Doe"
              styleTitle="hidden"
              showInitials
              onClick={() => setIsActive(!isActive)}
              className="!gap-x-0"
            />
            {isActive && (
              <PopOver
                menuItems={[
                  {
                    icon: (
                      <SvgLogout
                        stroke={tw.textColor["error-primary"]}
                        className="ml-auto cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen("LOGOUT_MODAL");
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => {}}
                      />
                    ),
                    text: "Check out",
                    onClick: () => setIsOpen("LOGOUT_MODAL"),
                  },
                ]}
                className="animate-fadeIn max-w-[300px] text-black absolute mr-4"
              />
            )}
          </div>
        </div>
      </nav>
      {children}
      <ConfirmationModal
        title="Check Out"
        description="Are you sure you want to Logout"
        onSubmit={() => {}}
        styleHeader="flex gap-x-4 !space-y-0"
        rightBtnName="Yes, Logout"
        isLoading={false}
        leftBtnName="Back"
        type="danger"
        isOpen={isOpen === "LOGOUT_MODAL"}
        size="md"
        close={() => setIsOpen("")}
      />
    </>
  );
}
