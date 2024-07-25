"use client";

import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { useFormState, useFormStatus } from "react-dom";

import signinAction from "@/app/actions/signin";

function SigninButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="mx-auto text-center py-2 px-4 rounded-lg button"
      type="submit"
    >
      {pending ? "Signing" : "Signin"}
    </button>
  );
}

const initState = {
  message: null,
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, signInAction] = useFormState(signinAction, initState);
  console.log(state);
  const toggleShowPassowrdHandler = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };
  return (
    <form
      action={signInAction}
      className="flex flex-col justify-center items-center gap-2"
    >
      <div className="bg-white p-1 rounded-lg w-full">
        <div className="error">{state?.error?.flag && state.error.name}</div>
        <input type="text" className="p-1" name="username" placeholder="username"></input>
      </div>
      <div className="bg-white p-1 rounded-lg w-full">
        <div className="error">{state?.error?.flag && state.error.email}</div>
        <input type="email" className="p-1" name="email" placeholder="email"></input>
      </div>
      <div className="flex flex-col gap-2">
        <div className="error">{state?.error?.flag && state.error.password}</div>
        <div className="flex items-center bg-white p-1 rounded-lg">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="rounded-lg p-1"
            placeholder="Password"
          ></input>
          <div
            className="cursor-pointer text-2xl"
            onClick={toggleShowPassowrdHandler}
          >
            {!showPassword ? <IoMdEyeOff></IoMdEyeOff> : <IoMdEye></IoMdEye>}
        </div>
        </div>
        <div className="flex items-center bg-white p-1 rounded-lg">
          <input
            name="confirm password"
            type={showPassword ? "text" : "password"}
            className="rounded-lg p-1"
            placeholder="confirm Password"
          ></input>
          <div
            className="cursor-pointer text-2xl"
            onClick={toggleShowPassowrdHandler}
          >
            {!showPassword ? <IoMdEyeOff></IoMdEyeOff> : <IoMdEye></IoMdEye>}
          </div>
        </div>
      </div>
      <div>
        <SigninButton></SigninButton>
      </div>
    </form>
  );
}
