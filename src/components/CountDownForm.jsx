"use client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCountDownSchema } from "@/lib/validaion";
import { useRef, useState, useTransition } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageGrid from "./ImageGrid";
import { onCreate } from "@/server-actions/add-countdown";
import { useRouter } from "next/navigation";

const images = [
  { id: 1, url: "/movies.jpg" },
  { id: 2, url: "/movies.jpg" },
  { id: 3, url: "/movies.jpg" },
  { id: 4, url: "/movies.jpg" },
  { id: 5, url: "/movies.jpg" },
  { id: 6, url: "/movies.jpg" },
  { id: 7, url: "/movies.jpg" },
  { id: 8, url: "/movies.jpg" },
  { id: 9, url: "/movies.jpg" },
  { id: 10, url: "/movies.jpg" },
];

const CountDownForm = () => {
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(1);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(AddCountDownSchema) });

  // handlesumbit

  const Submit = async (data) => {
    // handle errors
    setMessage("");
    setIsPending(true);
    const UserCountdownObject = { ...data, imageId: selectedImage };
    const res = await onCreate(UserCountdownObject);

    if (res.message.success) {
      setMessage(res.message.success);
      router.push(`/user/countdowns/${res.message.newCountdown.id}`);
    }
    if (res.message.Notfound) {
      setMessage(res.message.success);
      setMessage(res.message.Notfound);
      router.push(`/register`);
    }
    if (res.message.login) {
      setMessage(res.message.success);
      setMessage(res.message.login);
      router.push(`/login`);
    }
    if (res.message.tryagain) {
      setMessage(res.message.success);
      setMessage(res.message.tryagain);
      router.push(`/`);
    }

    setIsPending(false);
  };

  const handleChangeDate = (date) => {
    inputRef.current.focus();
  };

  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className='sm:w-3/4 w-[90%] h-full mx-auto p-2 pt-0'
    >
      <p className='text-red-900 min-h-6 text-center'>{message}</p>

      <div className='inputs'>
        {" "}
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
        {/* descreption */}
        <div className=' mb-2'>
          <div className='mb-1'>
            <label
              htmlFor={"description"}
              className='capitalize text-primary-content'
            >
              {"Descreition"}
            </label>
          </div>
          <Controller
            name={"description"}
            control={control}
            render={({ field }) => (
              <textarea
                placeholder='describe your countdown'
                className='textarea textarea-bordered textarea-lg w-full max-w-xs'
                {...field}
              ></textarea>
            )}
          />
        </div>
        {/* form inputs */}
        {/* Theme Picker */}
        <p className='mb-2 text-primary-content'>Pick a Theme</p>
        <ImageGrid
          images={images}
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
          {errors.date && (
            <p className='text-red-500 mt-3 font-light text-sm'>
              {errors.date.message}
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
