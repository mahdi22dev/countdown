"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInschema } from "@/lib/validaion";
const LoginForm = () => {
  const [Loading, setLoading] = useState(false);
  const [GuestLoading, setQuastLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInschema) });

  // handlesumbit
  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        setMessage("Password wrong or the email doesn't exist");
        setLoading(false);
      }
      if (callback?.ok && !callback?.error) {
        setMessage("redirect...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    });
  };
  // handleGuastSumbit
  const onGuestsSubmit = () => {
    const data = { email: "test3@gmail.com", password: "12345" };
    setMessage("");
    setQuastLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        setMessage("Password wrong or the email doesn't exist");
        setQuastLoading(false);
      }
      if (callback?.ok && !callback?.error) {
        setMessage("redirect...");
        setTimeout(() => {
          window.location.href = "/";
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
                    disabled={Loading || GuestLoading}
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
                  render={({ field }) => (
                    <input
                      id='password'
                      type='password'
                      autoComplete='current-password'
                      className='input input-accent w-full rounded-sm'
                      {...field}
                      disabled={Loading || GuestLoading}
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
                } btn min-h-[40px] h-3 max-h-3 rounded-sm w-full text-white flex justify-center items-center mb-2`}
                disabled={Loading}
              >
                {Loading && (
                  <span className='loading loading-spinner text-primary'></span>
                )}
                Sign in
              </button>
              <div
                onClick={onGuestsSubmit}
                className={`${
                  GuestLoading
                    ? " btn-disabled btn-primary btn-outline"
                    : "btn-secondary"
                } btn min-h-[40px] h-3 max-h-3 rounded-sm w-full text-white flex justify-center items-center`}
                disabled={GuestLoading}
              >
                {GuestLoading && (
                  <span className='loading loading-spinner text-secondary'></span>
                )}
                Guest Sign in
              </div>
            </div>
          </form>
          <div className='divider'>OR</div>
          <div>
            <button
              className={`${
                googleLoading
                  ? "btn-disabled btn-secondary btn-outline"
                  : "btn-secondary"
              } btn min-h-[35px] h-2 max-h-2 rounded-sm w-full flex justify-center items-center`}
              onClick={() => {
                signIn("github");
                setGoogleLoading(true);
              }}
            >
              {googleLoading && (
                <span className='loading loading-spinner text-primary'></span>
              )}
              Sign in with google
            </button>
          </div>
          <p className='mt-10 text-center text-sm '>
            Not a member?{" "}
            <a href='/auth/register' className='link link-primary '>
              create new account
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
