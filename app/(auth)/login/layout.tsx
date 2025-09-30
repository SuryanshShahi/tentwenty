"use client";
import Img from "@/app/shared/Img";
import { SvgStar } from "@/app/svgs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid lg:grid-cols-2 h-screen max-[1024px]:place-items-center">
      <div className="flex flex-col gap-y-8 justify-between sm:p-8 p-5 h-full w-full">
        <Img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwXSnP5bZfgBemXvPqggqweAcc-DhH28PW3g&s"
          height={40}
          width={70}
          alt="logo"
          isLocal
          className="h-[40px] object-contain"
        />
        {children}
        <div className="text-tertiary text-sm">© 2025 tentwenty</div>
      </div>
      <div
        className="lg:flex hidden gap-y-8 relative px-16 flex-col bg-cover bg-center h-screen w-full bg-blue-50 bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/99/3a/53/993a5337d5a4b8ccca1da381659e542d.jpg')`,
        }}
      >
        <div className="bg-bannerOverlay h-screen w-full left-0 absolute top-0" />
        <Img
          src="/images/overlay.png"
          alt="overlay"
          height={960}
          width={960}
          isLocal
          className="h-full w-full absolute top-0 left-0"
        />
        <div className="space-y-4 mt-auto z-10 mb-[88px]">
          <SvgStar height={64} width={80} />
          <h1 className="text-5xl leading-[60px] text-white font-semibold">
            TickTock
          </h1>
          <p className="text-xl text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </div>
  );
}
