"use client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCountDownSchema } from "@/lib/validaion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageGrid from "./ImageGrid";
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
  const [message, setMessage] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddCountDownSchema) });

  // handlesumbit
  const Submit = (data) => {
    console.table(data);
  };

  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className='sm:w-3/4 w-[90%] h-full mx-auto p-2 pt-0'
    >
      <p className='text-red-900'>{message}</p>

      {/* form inputs */}
      <div className=' mb-2'>
        <div className='mb-1'>
          <label htmlFor={"title"} className='capitalize text-primary-content'>
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
            htmlFor={"descreption"}
            className='capitalize text-primary-content'
          >
            {"Descreption"}
          </label>
        </div>
        <Controller
          name={"descreption"}
          control={control}
          render={({ field }) => (
            <textarea
              placeholder='descripe your countdown'
              className='textarea textarea-bordered textarea-lg w-full max-w-xs'
              {...field}
            ></textarea>
          )}
        />
        {errors.title && (
          <p className='text-error mt-3 font-light text-sm'>
            {errors.title.message}
          </p>
        )}
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
          name={"date"}
          control={control}
          render={({ field }) => (
            <DatePicker
              className='h-13 p-2 cursor-pointer input-primary input input-bordered z-50 text-primary '
              selected={targetDate}
              onSelect={(date) => setTargetDate(date)}
              style={{ zIndex: 1000 }}
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
      <button type='submit' className={`btn-primary`}>
        add countdown
      </button>
    </form>
  );
};

export default CountDownForm;
