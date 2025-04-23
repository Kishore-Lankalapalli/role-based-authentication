import React from "react";
import { Toaster } from "react-hot-toast";
import loginBannerImage from "../../assets/loginBannerImage.webp";
import LoginCard from "./LoginCard";

export default function LoginWrapper() {
  return (
    <div className='min-h-screen  lg:h-screen flex     w-screen relative'>
      <div className='hidden lg:flex h-full  lg:w-1/2 p-4'>
        <img src={loginBannerImage} className='w-full h-full ' alt='banner' />
      </div>
      <div className='lg:w-1/2 w-full flex flex-col items-center justify-between gap-8 lg:overflow-y-auto min-h-screen  px-8 py-10 '>
        <LoginCard />
      </div>
      <Toaster />
    </div>
  );
}
