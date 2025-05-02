import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { apiUrls } from "../api";

export default function Subadmin() {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [products, setProducts] = useState({
    create: false,
    delete: false,
    update: false,
    read: false,
  });
  const token = Cookies.get("jwt-token");

  const { id } = useParams();

  const navigate = useNavigate();

  const changename = (e) => {
    setName(e.target.value);
  };
  const changeemail = (e) => {
    setEmail(e.target.value);
  };
  const changepassword = (e) => {
    setPassword(e.target.value);
  };
  const changerole = (e) => {
    if (e.target.value === "EDITOR") {
      setProducts({
        create: false,
        read: true,
        update: true,
        delete: true,
      });
    } else if (e.target.value === "VIEWER") {
      setProducts({
        read: true,
        create: false,

        update: false,
        delete: false,
      });
    }
    setRole(e.target.value);
  };
  console.log(role);
  const changeProducts = (type) => {
    console.log(products?.type);
    setProducts({
      ...products,
      [type]: !products[type],
    });
  };
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const details = {
        name,
        email,
        password,
        role,
        permissions: {
          Dashboard: {
            read: true,
          },
          Reports: {
            read: true,
          },
          Products: products,
        },
      };
      const url = id ? apiUrls.updateSpecificUserDetails(id) : apiUrls.addUser;
      const options = {
        method: id ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };

      const response = await fetch(url, options);
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        toast.success(responseData?.message);
        setName("");
        setEmail("");
        setPassword("");
        setProducts({
          create: false,
          delete: false,
          update: false,
          read: false,
        });
        setRole("");
        fetchInfo();
      } else {
        toast.error(responseData?.errors[0]);
      }
    } catch (e) {
      toast.error(id ? "Failed to update" : "Failed to add");

      console.log(e);
    }
  };

  const fetchInfo = async () => {
    try {
      const url = apiUrls.fetchUser;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();

      console.log(responseData, "response data");
      if (response.ok) {
        return responseData.data;
      } else {
        return [];
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSpecificUserDetails = async () => {
    try {
      const url = apiUrls.fetchSpecificUserDetails(id);

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const responseData = await response.json();

      if (response.ok) {
        const permissions = responseData?.data?.permissions;
        setName(responseData?.data?.name);
        setEmail(responseData?.data?.email);
        setRole(responseData?.data?.role);
        setProducts({
          create: permissions?.Products?.create,
          delete: permissions?.Products?.delete,
          update: permissions?.Products?.update,
          read: permissions?.Products?.read,
        });

        console.log(responseData, "response data");
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["fetchInfo"],
    queryFn: fetchInfo,
  });

  const { data: specificUserDetails } = useQuery({
    queryKey: ["fetchSpecificUserDetails", id],
    queryFn: fetchSpecificUserDetails,
  });
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row?.name || "N.A",
    },
    {
      name: "Email",
      selector: (row) => row?.email || "N.A",
    },
    {
      name: "Role",
      selector: (row) => row?.role || "N.A",
    },
    {
      name: "Action",
      cell: (row) => (
        <div
          className='p-3 rounded-md border border-solid border-[#dfdfdf]'
          onClick={() => {
            navigate(`/form/edit/${row?._id}`);
          }}>
          <Icon icon='material-symbols:edit' />
        </div>
      ),
    },
  ];

  return (
    <div>
      <form
        className='flex flex-col items-center pt-[30px] gap-4'
        action=''
        onSubmit={submitForm}>
        <h1 className='text-[blue] font-bold text-[18px]'>Add-SubAdmin</h1>
        <div className='flex flex-col gap-2'>
          <input
            className='text-[14px] border-[black] border-2 w-[300px] h-[30px] pl-[10px]'
            type='text'
            placeholder='Name'
            onChange={changename}
            value={name}
          />
          <input
            className='text-[14px] border-[black] border-2 w-[300px] h-[30px] pl-[10px]'
            type='email'
            placeholder='Email'
            onChange={changeemail}
            value={email}
          />
          {!id && (
            <input
              className='text-[14px] border-[black] border-2 w-[300px] h-[30px] pl-[10px]'
              type='password'
              placeholder='Password'
              onChange={changepassword}
              value={password}
            />
          )}

          <label className='text-[16px] font-semibold' for='role'>
            Role
          </label>

          <select
            className='border-[black] border-2'
            name='role'
            id='role'
            value={role}
            onChange={changerole}>
            <option value='' selected disabled>
              Select role
            </option>
            <option value='EDITOR'>Editor</option>
            <option value='VIEWER'>Viewer</option>
            <option value='OTHER'>Other</option>
          </select>

          <h1 className='text-[16px] font-semibold mt-4'>
            Permissions for Products Module
          </h1>
          <div className=' grid grid-cols-3 gap-4'>
            <div className='flex flex-row gap-2'>
              <input
                type='checkbox'
                id='create'
                onChange={() => {
                  if (role !== "VIEWER" || role !== "EDITOR") {
                    changeProducts("create");
                  }
                }}
                checked={products.create}
                disabled={role === "EDITOR" || role === "VIEWER"}
              />

              <label htmlFor='create'>Create</label>
            </div>
            <div className='flex flex-row gap-2'>
              <input
                type='checkbox'
                id='delete'
                onChange={() => changeProducts("delete")}
                checked={products.delete}
                disabled={role === "VIEWER"}
              />

              <label htmlFor='delete'>Delete</label>
            </div>
            <div className='flex flex-row gap-2'>
              <input
                type='checkbox'
                id='update'
                onChange={() => changeProducts("update")}
                checked={products.update}
                disabled={role === "VIEWER"}
              />

              <label htmlFor='update'>Update</label>
            </div>
            <div className='flex flex-row gap-2'>
              <input
                type='checkbox'
                id='read'
                onChange={() => changeProducts("read")}
                checked={products.read}
              />

              <label htmlFor='read'>Read</label>
            </div>
          </div>
          <div className='flex items-center justify-center mt-[20px]'>
            <button
              className='w-[100px] h-[30px] bg-[blue] text-[white]'
              type='submit'>
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className='p-4'>
        <h1 className='text-[20px] font-semibold'>Information</h1>
        <main className='p-4'>
          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
}
