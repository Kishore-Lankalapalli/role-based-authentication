import Cookies from "js-cookie";
import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";

export default function Sidebar() {
  const { token, setToken } = useAuth();

  const navigate = useNavigate();

  const { user } = useAuth();

  console.log(user, "user");
  const sidebarOptions = [
    {
      path: "/",
      label: "Products",
    },
    // {
    //   path: "/reports",
    //   label: "Reports",
    // },
    {
      path: "/form",
      label: "subadmin",
    },
  ];

  const handleLogout = () => {
    setToken();
    Cookies.remove("jwt-token");
    navigate("/login");
  };

  console.log(user, "fetched user");

  const updatedSidebarOptions =
    user?.role !== "ADMIN"
      ? sidebarOptions?.filter((item) => item?.label !== "subadmin")
      : sidebarOptions;
  return (
    <div className='w-[15%] flex flex-col justify-between items-center gap-4 border-r border-solid border-[#000] min-h-screen p-4 '>
      <ul className='flex flex-col gap-4'>
        {updatedSidebarOptions?.map((item) => (
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
