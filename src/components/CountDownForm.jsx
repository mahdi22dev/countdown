"use client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCountDownSchema } from "@/lib/validaion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const images = [
  { id: 1, url: "/movies.jpg", selected: false },
  { id: 2, url: "/movies.jpg", selected: false },
  { id: 3, url: "/movies.jpg", selected: false },
  { id: 4, url: "/movies.jpg", selected: false },
  { id: 5, url: "/movies.jpg", selected: false },
  { id: 6, url: "/movies.jpg", selected: false },
];

const CountDownForm = () => {
  const [message, setMessage] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddCountDownSchema) });

  // handlesumbit
  const Submit = (data) => {
    console.table(data);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (id) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return { ...image, selected: true };
      } else {
        return { ...image, selected: false };
      }
    });

    setSelectedImage(id);
  };
  return (
    <form onSubmit={handleSubmit(Submit)} className='sm:w-2/4 w-3/4 mx-auto'>
      <p className='text-red-900'>{message}</p>

      {/* form inputs */}
      <div className=' mb-2'>
        <div className='mb-1'>
          <label htmlFor={"title"} className='capitalize'>
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
          <p className='text-red-500 mt-3 font-light text-sm'>
            {errors.title.message}
          </p>
        )}
      </div>
      {/* Date Picker */}
      <div className='mb-2'>
        <div className='mb-1'>
          <label htmlFor={"date"} className='capitalize'>
            Pick a Date
          </label>
        </div>
        <Controller
          name={"date"}
          control={control}
          render={({ field }) => (
            <DatePicker
              className='h-13 p-2 cursor-pointer input-primary input input-bordered '
              selected={targetDate}
              onSelect={(date) => setTargetDate(date)}
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
      {/* form inputs */}
      {/* Theme Picker */}
      <p>Pick Theme</p>

      <button type='submit' className={`btn-primary`}>
        add countdown
      </button>
    </form>
  );
};

export default CountDownForm;
