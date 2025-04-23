import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { apiUrls } from "../api";
import { Link, useNavigate } from "react-router";

export default function ProductsList() {
  const [productsData, setData] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("jwt-token");

      const url = apiUrls.fetchProducts;
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
        setData(responseData?.data);
      } else {
        setData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
  });

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Title",
      selector: (row) => row?.title || "N.A",
      
    },
    {
      name: "Price",
      selector: (row) => row?.price || "N.A",
    },
    {
      name: "Description",
      selector: (row) => row?.description || "N.A",
    },
    {
      name: "Action",
      cell: (row) => (
        <div
          onClick={() => {
            navigate(`/products/edit/${row?._id}`);
          }}
          className='border border-solid border-[#dfdfdf] p-3 rounded-md'>
          <Icon icon='material-symbols:edit' className='text-base' />
        </div>
      ),
    },
  ];
  return (
    <>
      <header className='flex justify-between items-center'>
        <h1>Products</h1>
        <Link
          to={"add"}
          type='button'
          className='bg-[pink] p-3 rounded-md text-[#000] text-sm font-medium '>
          Add Product
        </Link>
      </header>

      <main>
        <DataTable columns={columns} data={productsData} />
      </main>
    </>
  );
}
