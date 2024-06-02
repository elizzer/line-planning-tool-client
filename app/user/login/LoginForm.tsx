"use client";

import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import login from "@/app/actions/login"
import { useFormState, useFormStatus } from "react-dom";

const initState={
    message:null
}

function LoginButton(){
    const { pending } = useFormStatus()
    return(
        <button
          disabled={pending}
          className="mx-auto text-center py-2 px-4 rounded-lg button"
          type="submit"
        >
          {pending ? "Logging" : "Login"}
        </button>
    );
}

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassowrdHandler = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };

  const [state,loginAction]=useFormState(login,initState)


  return (
    <form
    className="flex flex-col gap-2 justify-center items-center"
      action={loginAction}
    >
      <div className="text-red-500">
        {state?.message}
      </div>
      <div
        className={`flex flex-col items-center w-full bg-white p-1 rounded-lg`}
      >
        <div className="text-red-500">
          
        </div>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className=" w-full p-1 rounded-lg"
        ></input>
      </div>
      <div className="bg-white p-1 rounded-lg flex flex-col items-center">
        <div className="text-red-500">
          
        </div>
        <div className="flex items-center ">
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
      </div>
      <div>
        <LoginButton></LoginButton>
      </div>
    </form>
  );
}
