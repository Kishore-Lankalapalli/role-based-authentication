import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { apiUrls } from "../api";
import { BeatLoader } from "react-spinners";

export default function AddProductForm() {
  const { id } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,

    setValue,
  } = useForm();

  const createProduct = async (data) => {
    try {
      const token = Cookies.get("jwt-token");

      const url = id ? apiUrls.updateProduct(id) : apiUrls.addProducts;

      const options = {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const responseObj = await response.json();

      if (response.ok) {
        toast.success(responseObj?.message);

        if (!id) {
          reset();
        }
      } else {
        toast.error(responseObj?.message);
      }
    } catch (e) {
      toast.error("Failed to add product");
    }
  };

  const fetchSpecificProductDetails = async () => {
    try {
      const token = Cookies.get("jwt-token");
      const url = apiUrls.fetchSpecificProduct(id);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const responseData = await response.json();

      console.log(response);
      console.log(responseData, ".aiDSUFh");

      if (response.ok) {
        setValue("title", responseData?.data?.title);
        setValue("price", responseData?.data?.price);

        setValue("description", responseData?.data?.description);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  const { data } = useQuery({
    queryKey: ["fetchSpecificProductDetails"],
    queryFn: fetchSpecificProductDetails,
  });

  const submitData = async (data) => {
    createProductMutation.mutate(data);

    console.log(data);
  };
  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <h1>{id ? "Edit" : "Add"} Product</h1>
      <form onSubmit={handleSubmit(submitData)} className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8'>
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm text-[#060606] font-medium'
              htmlFor='title'>
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              {...register("title", {
                required: "This field is required",
              })}
              className='border border-solid border-[#dfdfdf] rounded-md outline-none py-2  px-4'
            />
            {errors?.title && (
              <p className='text-sm text-[#f00]'>{errors?.title?.message}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm text-[#060606] font-medium'
              htmlFor='price'>
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              {...register("price", {
                required: "*This field is required",
              })}
              className='border border-solid border-[#dfdfdf] rounded-md outline-none py-2  px-4'
            />
            {errors?.price && (
              <p className='text-sm text-[#f00]'>{errors?.price?.message}</p>
            )}
          </div>
          <div className='flex flex-col gap-2 sm:col-span-2'>
            <label
              className='text-sm text-[#060606] font-medium'
              htmlFor='description'>
              Description
            </label>
            <textarea
              rows='5'
              id='description'
              name='description'
              {...register("description", {
                required: "*This field is required",
              })}
              className='border border-solid border-[#dfdfdf] rounded-md outline-none py-2  px-4'
            />
            {errors?.description && (
              <p className='text-sm text-[#f00]'>
                {errors?.description?.message}
              </p>
            )}
          </div>
        </div>
        <div className='self-end'>
          {createProductMutation?.isPending ? (
            <BeatLoader size={15} color='red' />
          ) : (
            <button
              type='submit'
              className='my-4 bg-[#57a3ad] p-3 text-white rounded-md px-10'>
              {id ? "Save" : "Add"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
