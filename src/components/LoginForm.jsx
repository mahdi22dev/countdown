"use client";
// Need to be edited
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const LoginForm = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");

  // schema validation
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // handlesumbit
  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log(data);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        setMessage("password wrong");
        setLoading(false);
      }
      if (callback?.ok && !callback?.error) {
        setMessage("redirect...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    });
  };

  return (
    <main
      style={{ backgroundImage: "url('/bgc.jpg')" }}
      className='min-h-[80vh] flex flex-col justify-center items-center  bg-cover bg-center bg-no-repeat bg-fixed'
    >
      <div
        // style={{ backdropFilter: "blur(5px)" }}
        className='w-[90vw] sm:w-96 border border-s-orange-400 p-3 mx-auto rounded-md min-h-fit'
      >
        <div className='sm:mx-auto sm:w-full text-left sm:max-w-sm'>
          <h2 className='mt-3 text-secondary  text-2xl md:text-4xl font-bold leading-9 tracking-tight  '>
            Sign in
          </h2>
          <p className='mt-4 text-xs md:text-sm text-secondary'>
            sign in to add your cuntdowns
          </p>
        </div>
        {/* error message */}
        <div
          className={`${
            message ? "flex" : "hidden"
          }  text-center justify-center w-full mt-2`}
        >
          <p className='text-red-900'>{message}</p>
        </div>
        <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='mb-2'>
                <label htmlFor='email'>Email</label>
              </div>
              <Controller
                name='email'
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
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label className='mb-1'>Password</label>

                <div className='text-sm'>
                  <a href='#' className='link hover:link-primary link-hover'>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <input
                      id='password'
                      type='password'
                      autoComplete='current-password'
                      className='input input-accent w-full rounded-sm'
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <p className='text-red-500 mt-3 font-light text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {/*sumbit button */}
            <div>
              <button
                type='submit'
                className={`${
                  Loading
                    ? " btn-disabled btn-primary btn-outline"
                    : "btn-primary"
                } btn min-h-[40px] h-3 max-h-3 rounded-sm  w-full text-white flex justify-center items-center`}
              >
                {Loading && (
                  <span className='loading loading-spinner text-primary'></span>
                )}
                Sign in
              </button>
            </div>
          </form>
          <div className='divider'>OR</div>
          <div>
            <button
              type='submit'
              className={`btn-secondary btn min-h-[35px] h-2 max-h-2 rounded-sm  w-full  flex justify-center items-center`}
            >
              Sign in with google
            </button>
          </div>
          <p className='mt-10 text-center text-sm '>
            Not a member?{" "}
            <a href='/register' className='link link-primary '>
              create new account
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
