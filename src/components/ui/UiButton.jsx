"use client";
import React from "react";

const UiButton = ({ variant, text }) => {
  return <button class={`btn btn-${variant} `}>{text}</button>;
};

export default UiButton;
