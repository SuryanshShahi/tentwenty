"use client";
import Button from "@/app/shared/Button";
import IconWithBg from "@/app/shared/IconWithBg";
import InputField from "@/app/shared/input/InputField";
import SelectionControl from "@/app/shared/input/SelectionControl";
import { SvgLogin } from "@/app/svgs";
import useHook from "./useHook";

const Page = () => {
  const { setDetails, details, isLoading, error, handleSubmit } = useHook();
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
          <div className="text-tertiary">Sign in to your account</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email"
          placeholder="Enter email"
          className="w-full"
          type="email"
          value={details?.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          required
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          className="w-full"
          value={details?.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          required
        />
        <SelectionControl
          type="checkbox"
          label="Remember Me"
          wrapperClass="!mt-4"
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <Button
          btnName={isLoading ? "Signing In..." : "Sign In"}
          type="submit"
          fullWidth
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Page;
