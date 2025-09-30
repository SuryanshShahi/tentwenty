import DropdownField from "@/app/shared";
import CounterBtn from "@/app/shared/CounterBtn";
import { ModalTemplate } from "@/app/shared/modal/ModalTemplate";
import { useState } from "react";

const AddEntryModal = ({
  isOpen,
  close,
}: {
  isOpen: string;
  close: () => void;
}) => {
  const [count, setCount] = useState(1);
  return (
    <ModalTemplate
      modalProps={{
        isOpen: ["ADD_ENTRY", "EDIT_MODAL"].includes(isOpen),
        close,
      }}
      headerDetails={{
        title: isOpen === "EDIT_MODAL" ? "Edit Entry" : "Add New Entry",
        subtitle: "asdda",
      }}
      btnProps={{
        rightBtnName: "Add Entry",
        rightOnClick: () => {},
        leftBtnName: "Cancel",
      }}
      className="p-5 space-y-4"
    >
      <div className="space-y-1">
        <label className="text-secondary text-sm font-medium">
          Select Project
        </label>
        <DropdownField
          name="project"
          placeholder="Project Name"
          options={[
            {
              label: "abc",
              value: "abc",
            },
          ]}
          value=""
        />
      </div>
      <div className="space-y-1">
        <label className="text-secondary text-sm font-medium">
          Select Project
        </label>
        <DropdownField
          name="work"
          placeholder="Bug fixes"
          options={[
            {
              label: "abc",
              value: "abc",
            },
          ]}
          value=""
        />
      </div>
      <div className="space-y-1">
        <label className="text-secondary text-sm font-medium">
          Select Project
        </label>
        <textarea
          className="p-3 rounded-lg border border-secondary w-full"
          placeholder="Write text here..."
          rows={5}
        ></textarea>
      </div>
      <div className="space-y-1">
        <label className="text-secondary text-sm font-medium">
          Select Project
        </label>
        <CounterBtn
          add={() => setCount((p) => p + 1)}
          remove={() => setCount((p) => p - 1)}
          value={count}
        />
      </div>
    </ModalTemplate>
  );
};

export default AddEntryModal;
