"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { headers } from "../../../next.config";

export default function page() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    console.log(res.status);
    const jsonResponse = await res.json();
    if (!jsonResponse) {
      throw new Error("error");
    }
    setMessage(jsonResponse.message);
    if (res.status == 200) {
      router.push("/login");
    }
  };
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 '>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10  text-white text-center text-2xl font-bold leading-9 tracking-tight '>
          Sign in to your account
        </h2>
      </div>
      {/* error message */}
      <div
        className={`${
          message ? "flex" : "hidden"
        } min-h-6 text-center justify-center w-full m-4`}
      >
        <p className='text-red-900'> {message}</p>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSumbit}>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium leading-6   text-white'
            >
              Username
            </label>
            <div className='mt-2'>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                value={data.username}
                className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6   text-white'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={data.email}
                className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6  text-white'
              >
                Password
              </label>
              <div className='text-sm'>
                <a href='#' className='font-semibold  hover:text-indigo-500'>
                  Forgot password?
                </a>
              </div>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                value={data.password}
                className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sing Up
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm '>
          Not a member?{" "}
          <a
            href='#'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
