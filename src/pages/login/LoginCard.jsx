// Libraries imports
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../../AuthContext";
import { apiUrls } from "../../api";
// Files import

export default function LoginCard() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const { setToken, setUser } = useAuth();

  const navigate = useNavigate();

  const submitData = async (data) => {
    setLoader(true);
    const { email, password } = data;
    try {
      const url = apiUrls.login;

      console.log(url, "url received");
      const options = {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();

      console.log(responseData, "response data");

      if (response.ok) {
        setToken(responseData?.token);
        Cookies.set("jwt-token", responseData?.token);

        setUser(responseData?.user);
        navigate("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (e) {
      console.log(e, "error");
      toast.error(e?.message);
    }
    setLoader(false);
  };
  return (
    <div className='flex flex-1  flex-col justify-center gap-6 sm:gap-10 w-full max-w-[26rem] max-lg:py-10'>
      <form
        onSubmit={handleSubmit(submitData)}
        className='flex flex-col  gap-4 sm:gap-8'>
        <div className='flex flex-col gap-2 items-start'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl text-[#000719] font-bold'>
            Welcome Back!
          </h1>
          <p className='text-[#6B7283] text-sm sm:text-base font-normal text-left'>
            Enter your  email and password to access your account securely.
            Welcome back to our platform!
          </p>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <label
            htmlFor='userId'
            className='text-[#00081D] text-sm sm:text-base font-medium text-left'>
            Email
          </label>
          <input
            id='email'
            name='email'
            {...register("email", {
              required: "*This field is required",
            })}
            placeholder='Enter your email'
            type='text'
            className='border border-solid border-[#969BA7] w-full rounded-md py-2 px-4 sm:p-4 outline-none placeholder:text-[#969BA7]  font-normal'
          />
          {errors?.email && (
            <p className='text-sm text-[#f00]'>{errors?.email?.message}</p>
          )}
        </div>
        <div className='flex flex-col items-start gap-2'>
          <label
            htmlFor='password'
            className='text-[#00081D] text-sm sm:text-base font-medium text-left'>
            Password
          </label>
          <div className='relative flex border border-solid border-[#969BA7] rounded-md py-2 sm:py-4 w-full'>
            <input
              id='password'
              placeholder='Enter your password'
              type={showPassword ? "text" : "password"}
              name='password'
              {...register("password", {
                required: "*This field is required",
                // minLength: {
                //   value: 8,
                //   message: "Password must be at least 8 characters long",
                // },
                // maxLength: {
                //   value: 20,
                //   message: "Password must be no more than 20 characters long",
                // },
                // validate: {
                //   hasUpperCase: (value) =>
                //     /[A-Z]/.test(value) ||
                //     "Password must have at least one uppercase letter",
                //   hasNumber: (value) =>
                //     /\d/.test(value) || "Password must have at least one number",
                //   hasSpecialChar: (value) =>
                //     /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                //     "Password must have at least one special character",
                // },
              })}
              className='flex-1  px-4 outline-none h-full  placeholder:text-[#969BA7]  font-normal pr-8'
            />
            <div className='text-[1.2rem] pl-[0.5rem] xs:pl-[1rem] absolute right-2 xs:right-6 text-black cursor-pointer flex items-center '>
              <Icon
                onClick={() => setShowPassword(!showPassword)}
                className={`text-[1.5rem] text-[#969BA7]  
              }`}
                icon={
                  showPassword
                    ? "heroicons-solid:eye"
                    : "heroicons-outline:eye-off"
                }
              />
            </div>
          </div>
          {errors?.password && (
            <p className='text-sm text-[#f00]'>{errors?.password?.message}</p>
          )}
          <p className='text-[#4B5563] text-sm sm:text-base font-medium text-right cursor-pointer self-end'>
            Forgot password?
          </p>
        </div>

        <button
          type='submit'
          className='bg-[blue] text-white text-base font-semibold py-2 sm:py-4 rounded-[60px]'>
          {loader ? (
            <PulseLoader size={5} color='#fff' speedMultiplier={2} />
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
}
