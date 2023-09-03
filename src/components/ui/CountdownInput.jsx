import React from "react";
import { Controller } from "react-hook-form";

const CountdownInput = ({ name, control, errors, ...props }) => {
  return (
    <div className='countdown-componenet mb-2'>
      <div className='mb-2'>
        <label htmlFor={name} className='capitalize'>
          {name}
        </label>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            className='input input-accent w-full rounded-sm'
            {...props}
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

export default CountdownInput;
