import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Subadmin() {
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
    setRole(e.target.value);

  };
  console.log(role)
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
      const url = "https://th305mmg-3000.inc1.devtunnels.ms/signup";
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(details),
      };

      const response = await fetch(url, options);
      const responseData = await response.json();
      console.log(responseData);
      if(response.ok){

        toast.success(responseData?.message)
        setName("")
        setEmail("")
        setPassword("")
        setProducts({
            create: false,
            delete: false,
            update: false,
            read: false,
          })
        setRole("")
      }
      else {
        toast.error(responseData?.message)

      }
    } catch (e) {
        toast.error('Failed to add')

      console.log(e);
    }
  };
  

  console.log(products);
  return (
    <div>
      <form
        className="flex flex-col items-center pt-[30px] h-screen gap-4"
        action=""
        onSubmit={submitForm}
      >
        <h1 className="text-[blue] font-bold text-[18px]">Add-SubAdmin</h1>
        <div className="flex flex-col gap-2">
          <input
            className="text-[14px] border-[black] border-2 w-[300px] h-[30px] pl-[10px]"
            type="text"
            placeholder="Name"
            onChange={changename}
            value={name}
          />
          <input
            className="text-[14px] border-[black] border-2 w-[300px] h-[30px] pl-[10px]"
            type="email"
            placeholder="Email"
            onChange={changeemail}
            value={email}
          />
          <input
            className="text-[14px] border-[black] border-2 w-[300px] h-[30px] pl-[10px]"
            type="password"
            placeholder="Password"
            onChange={changepassword}
            value={password}
          />
          <label className="text-[16px] font-semibold" for="role">
            Role
          </label>

          <select
            className="border-[black] border-2"
            name="role"
            id="role"
            onChange={changerole}
          >
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">Viewer</option>
            <option value="OTHER">Other</option>
          </select>

          <h1 className="text-[16px] font-semibold">Products</h1>
          <div className=" grid grid-cols-3 gap-4">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="create"
                onChange={() => changeProducts("create")}
                checked={products.create}
              />

              <label htmlFor="create">Create</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="delete"
                onChange={() => changeProducts("delete")}
                checked={products.delete}
              />

              <label htmlFor="delete">Delete</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="update"
                onChange={() => changeProducts("update")}
                checked={products.update}
              />

              <label htmlFor="update">Update</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="read"
                onChange={() => changeProducts("read")}
                checked={products.read}
              />

              <label htmlFor="read">Read</label>
            </div>
          </div>
          <div className="flex items-center justify-center mt-[20px]">
            <button
              className="w-[100px] h-[30px] bg-[blue] text-[white]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
