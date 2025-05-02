import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Popup from "reactjs-popup";
import { apiUrls } from "../api";
import { queryClient } from "../main";

export default function ProductsList() {
  const [productsData, setData] = useState([]);

  const navigate = useNavigate();
  const token = Cookies.get("jwt-token");

  const fetchProducts = async () => {
    try {
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

  const deleteProduct = async (id) => {
    try {
      const url = apiUrls.deleteProduct(id);
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData?.message);
      } else {
        toast.error(responseData?.message);
      }
    } catch (e) {
      toast.error("Failed to delete the product");
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchProducts"] });
    },
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
        <div className='flex flex-row items-center gap-2'>
          <div
            onClick={() => {
              navigate(`/edit/${row?._id}`);
            }}
            className='border border-solid border-[#dfdfdf] p-3 rounded-md'>
            <Icon icon='material-symbols:edit' className='text-base' />
          </div>

          <Popup
            modal
            position={"center center"}
            trigger={
              <button className='bg-[red] text-white  p-3 rounded-md'>
                Delete
              </button>
            }>
            {(close) => (
              <div className='bg-white p-4 shadow-lg flex items-center gap-3'>
                <button
                  onClick={() => {
                    deleteMutation.mutate(row?._id);
                  }}
                  className='bg-[green] text-white p-3 rounded-md '
                  type='button'>
                  Confirm
                </button>
                <button onClick={() => close()} type='button'>
                  Cancel
                </button>
              </div>
            )}
          </Popup>
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
