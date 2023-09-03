import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const CustomCountdownInput = ({ name, control, errors, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className='countdown-componenet '>
      <div className='mb-2'>
        <label htmlFor={name} className='capitalize'>
          Pick a Date
        </label>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            className='h-13 p-2 cursor-pointer'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            {...field}
          />
        )}
      />
      {errors.name && (
        <p className='text-red-500 mt-3 font-light text-sm'>
          {errors.name.message}
        </p>
      )}
    </div>
  );
};

export default CustomCountdownInput;
