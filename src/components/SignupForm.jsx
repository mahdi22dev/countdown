"use client";
import { yupResolver } from "@hookform/resolvers/yup";
// Need to be edited
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

const SignupForm = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSumbit = async (e, data) => {
    console.log(data);
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    console.log(res.status);
    setLoading(false);
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
    <main
      style={{ backgroundImage: "url('/bgc.jpg')" }}
      className='min-h-[80vh] flex flex-col justify-center items-center  bg-cover bg-center bg-no-repeat bg-fixed'
    >
      <div
        // style={{ backdropFilter: "blur(5px)" }}
        className='w-[90vw] sm:w-96 border border-s-orange-400 p-3 mx-auto rounded-md '
      >
        <div className='sm:mx-auto sm:w-full text-left sm:max-w-sm'>
          <h2 className='mt-3 text-secondary  text-2xl md:text-4xl font-bold leading-9 tracking-tight  '>
            Sign up
          </h2>
          <p className='mt-4 text-xs md:text-sm text-secondary'>
            sign up to add your cuntdowns
          </p>
        </div>
        {/* error message */}
        <div
          className={`${
            message ? "flex" : "hidden"
          } min-h-[10px] text-center justify-center w-full m-4`}
        >
          <p className='text-red-900'>{message}</p>
        </div>
        <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSumbit)}>
            {/* username */}
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-secondary'
              >
                Username
              </label>
              <div className='mt-2'>
                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <input
                      autoComplete='username'
                      required
                      className='input input-accent w-full rounded-sm'
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className='text-red-500 mt-3 font-light text-sm'>
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-secondary'
              >
                Email address
              </label>
              <div className='mt-2'>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <input
                      autoComplete='email'
                      className='input input-accent w-full rounded-sm'
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className='text-red-500 mt-3 font-light text-sm'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-secondary'
              >
                Password
              </label>

              <div className='mt-2'>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <input
                      autoComplete='current-password'
                      className='input input-accent w-full rounded-sm'
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className='text-red-500 mt-3 font-light text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {/*  Confirm Password */}
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-secondary'
                >
                  Confirm Password
                </label>
              </div>
              <div className='mt-2'>
                <Controller
                  name='confirmPassword'
                  control={control}
                  render={({ field }) => (
                    <input
                      className='input input-accent w-full rounded-sm'
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className='text-red-500 mt-3 font-light text-sm'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            {/* sumbit button */}
            <div>
              <button
                type='submit'
                className={`${
                  Loading
                    ? " btn-disabled btn-primar btn-outline"
                    : "btn-primary"
                } btn min-h-[20px] rounded-sm  w-full text-white flex justify-center items-center`}
              >
                {Loading && (
                  <span className='loading loading-spinner text-primary'></span>
                )}
                Sign up
              </button>
            </div>
          </form>
          <div className='divider'>OR</div>
          {/* google auth */}
          <div>
            <button
              type='submit'
              className={`btn-secondary btn min-h-[35px] h-2 max-h-2 rounded-sm  w-full  flex justify-center items-center`}
            >
              Sign up with google
            </button>
          </div>
          <p className='mt-10 text-center text-sm '>
            Already a member?{" "}
            <a href='/login' className='link link-primary '>
              sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
