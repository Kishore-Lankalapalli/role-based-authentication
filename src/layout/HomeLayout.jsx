import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function HomeLayout() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}
