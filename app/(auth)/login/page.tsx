"use client";
import Button from "@/app/shared/Button";
import IconWithBg from "@/app/shared/IconWithBg";
import InputField from "@/app/shared/input/InputField";
import SelectionControl from "@/app/shared/input/SelectionControl";
import { SvgLogin } from "@/app/svgs";

const Page = () => {
  return (
    <div className="lg:max-w-[370px] max-w-[530px] space-y-6 w-full m-auto">
      <div className="space-y-4">
        <IconWithBg
          icon={
            <SvgLogin
              height={28}
              width={28}
              stroke="white"
              className="absolute"
            />
          }
          size="md"
        />
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-black">Welcome Back</div>
          <div className="text-tertiary">asdasds</div>
        </div>
      </div>
      <InputField
        label="Email"
        placeholder="Enter email"
        className="w-full"
        type="email"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        className="w-full"
      />
      <SelectionControl
        type="checkbox"
        label="Remember Me"
        wrapperClass="!mt-4"
      />
      <Button btnName="Sign In" onClick={() => {}} fullWidth />
    </div>
  );
};

export default Page;
