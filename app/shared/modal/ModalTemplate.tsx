import UserCard from "@/app/shared/cards/UserCard";
import IconWithBg from "@/app/shared/IconWithBg";
import { IModal, Modal } from "@/app/shared/modal";
import { SvgCross, SvgLogin } from "@/app/svgs";
import { tw } from "@/tailwind.config";
import clsx from "clsx";
import { FC, Fragment, PropsWithChildren, ReactNode } from "react";
import Button from "../Button";
import Divider from "../Divider";

interface IModalTemplate {
  className?: string;
  headerDetails?: {
    title: string;
    subtitle: ReactNode;
    icon?: ReactNode;
  };
  btnProps?: {
    leftBtnName?: string;
    rightBtnName?: string;
    btnWrapperClass?: string;
    isRightBtnLoading?: boolean;
    isLeftBtnLoading?: boolean;
    leftOnClick?: () => void;
    rightOnClick?: () => void;
    disabled?: boolean;
  } | null;
  modalProps: IModal;
}

export const ModalTemplate: FC<PropsWithChildren<IModalTemplate>> = ({
  children,
  className,
  headerDetails,
  btnProps,
  modalProps,
}) => {
  return (
    <Modal {...modalProps}>
      {headerDetails && (
        <Fragment>
          <UserCard
            title={headerDetails?.title}
            subtitle={headerDetails?.subtitle}
            styleTitle="text-lg"
            styleSubtitle="!text-tertiary"
            className="gap-x-4 p-6 !items-start"
            image={
              <IconWithBg
                icon={
                  headerDetails?.icon ?? (
                    <SvgLogin height={20} width={20} stroke="white" />
                  )
                }
              />
            }
          >
            <SvgCross
              height={24}
              width={24}
              stroke={tw.textColor["tertiary"]}
              className="ml-auto cursor-pointer"
              onClick={modalProps.close}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            />
          </UserCard>
          <Divider variant="secondary" />
        </Fragment>
      )}

      <div className={clsx("overflow-y-scroll", className)}>{children}</div>
      {btnProps && (
        <div
          className={clsx(
            "flex p-6 shadow-top w-full gap-x-3 mt-auto",
            btnProps.btnWrapperClass
          )}
        >
          {btnProps?.leftBtnName && (
            <Button
              btnName={btnProps?.leftBtnName}
              variant="secondary"
              fullWidth
              onClick={btnProps?.leftOnClick || modalProps?.close}
              isLoading={btnProps?.isLeftBtnLoading}
            />
          )}
          {btnProps?.rightBtnName && (
            <Button
              btnName={btnProps?.rightBtnName}
              fullWidth
              onClick={btnProps?.rightOnClick}
              disabled={btnProps?.disabled}
              isLoading={btnProps?.isRightBtnLoading}
            />
          )}
        </div>
      )}
    </Modal>
  );
};
