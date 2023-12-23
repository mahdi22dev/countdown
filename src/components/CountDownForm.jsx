"use client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCountDownSchema } from "@/lib/validaion";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageGrid from "./ImageGrid";
import { onCreate } from "@/server-actions/add-countdown";
import { useRouter } from "next/navigation";
import { notifySuccess } from "@/lib/Toast";

const CountDownForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [targetDate, setTargetDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(1);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddCountDownSchema) });

  // handlesumbit

  const Submit = async (data) => {
    // handle errors
    try {
      setMessage(null);
      setIsPending(true);
      const UserCountdownObject = { ...data, imageId: selectedImage };
      const res = await onCreate(UserCountdownObject);
      if (res.message.success) {
        setMessage(res.message.success);
        router.push(`/user/countdowns/${res.message.newCountdown.id}`);
      }
      if (res.message.Notfound) {
        setMessage(res.message.Notfound);
        router.push(`/auth/register`);
      }
      if (res.message.login) {
        setMessage(res.message.login);
        router.push(`/auth/login`);
      }
      if (res.message.tryagain) {
        setMessage(res.message.tryagain);
        router.push(`/`);
      }
      setSelectedImage("");
      setIsPending(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleChangeDate = () => {
    inputRef.current.focus();
  };

  if (isError) {
    return <div>error</div>;
  }
  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className=' w-[100%] h-full mx-auto p-2 pt-0'
    >
      {message && notifySuccess(message)}

      <div className='inputs'>
        {/* form inputs */}
        <div className=' mb-2'>
          <div className='mb-1'>
            <label
              htmlFor={"title"}
              className='capitalize text-primary-content'
            >
              {"title"}
            </label>
          </div>
          <Controller
            name={"title"}
            control={control}
            render={({ field }) => (
              <input
                className='input input-primary w-full rounded-sm'
                {...field}
              />
            )}
          />
          {errors.title && (
            <p className='text-error mt-3 font-light text-sm'>
              {errors.title.message}
            </p>
          )}
        </div>

        <p className='mb-2 text-primary-content'>Pick a Theme</p>
        <ImageGrid
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />
        {/* Date Picker */}
        <div className='mb-2 mt-2'>
          <div className='mb-1'>
            <label htmlFor={"date"} className='capitalize text-primary-content'>
              Pick a Date
            </label>
          </div>
          <Controller
            name={"targetDate"}
            control={control}
            render={({ field }) => (
              <DatePicker
                className='h-13 p-2 cursor-pointer input-primary input input-bordered z-50 text-primary '
                selected={targetDate}
                onSelect={(date) => setTargetDate(date)}
                style={{ zIndex: 1000 }}
                onChange={handleChangeDate}
                ref={inputRef}
                showPopperArrow
                value={targetDate}
                {...field}
              />
            )}
          />
          {errors.targetDate && (
            <p className='text-red-500 mt-3 font-light text-sm'>
              {errors.targetDate.message}
            </p>
          )}
        </div>
      </div>

      <button
        type='submit'
        className={` ${
          isPending ? "btn-disabled btn-primary btn-outline" : "btn-primary"
        } btn flex justify-center items-center mx-auto mt-2`}
      >
        {isPending && (
          <span className='loading loading-spinner text-primary loading-xs '></span>
        )}
        add countdown
      </button>
    </form>
  );
};

export default CountDownForm;
