"use client";
import React from "react";

const OutlineBtn = ({ variant, text }) => {
  return <button class={`btn btn-${variant} btn-outline`}>{text}</button>;
};

export default OutlineBtn;
