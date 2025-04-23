import React from "react";
import { NavLink, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext";

export default function Sidebar() {
  const { token, setToken } = useAuth();

  const navigate = useNavigate();
  const sidebarOptions = [
    {
      path: "",
      label: "Dashboard",
    },
    {
      path: "/products",
      label: "Products",
    },
    {
      path: "/reports",
      label: "Reports",
    },
  ];

  const handleLogout = () => {
    setToken();
    Cookies.remove("jwt-token");
    navigate("/login");
  };
  return (
    <div className='w-[15%] flex flex-col justify-between items-center gap-4 border-r border-solid border-[#000] min-h-screen p-4 '>
      <ul className='flex flex-col gap-4'>
        {sidebarOptions?.map((item) => (
          <NavLink
            to={item?.path}
            className={({ isActive }) =>
              `${isActive ? "text-[blue]" : "text-[grey]"}`
            }>
            {item?.label}
          </NavLink>
        ))}
      </ul>

      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
