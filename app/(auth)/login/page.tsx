"use client";
import Button from "@/app/shared/Button";
import IconWithBg from "@/app/shared/IconWithBg";
import InputField from "@/app/shared/input/InputField";
import SelectionControl from "@/app/shared/input/SelectionControl";
import { SvgLogin } from "@/app/svgs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push("/timesheet");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/timesheet");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

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
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <InputField
          label="Email"
          placeholder="Enter email"
          className="w-full"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SelectionControl
          type="checkbox"
          label="Remember Me"
          wrapperClass="!mt-4"
        />
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
