"use server";

import { redirect } from "next/navigation";

interface SigninCreds {
  username: string;
  password: string;
  email: string;
}

async function signin(creds: SigninCreds) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/auth/signup`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(creds),
        cache:"no-cache"
    })
    return response
}

export default async function signinAction(
  prevState: any,
  signinFormData: FormData
) {
  console.log("[+]Form data for signin", signinFormData);
  const _data = {
    username: signinFormData.get("username") as string,
    password: signinFormData.get("password") as string,
    confirmPassword: signinFormData.get("confirm password") as string,
    email: signinFormData.get("email") as string,
  };

  let error = {
    flag: false,
    name: "",
    password: "",
    email: "",
  };

  if (_data.username === "") {
    (error.flag = true), (error.name = "Username field is requied");
  }

  if (_data.password === "") {
    (error.flag = true), (error.password = "Password field is required");
  }else if(_data.password!==_data.confirmPassword){
        error.flag=true
        error.password="Confirm password does not match"
  } 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (_data.email === "") {
    error.flag = true;
    error.email = "Email field is required";
  } else if (!emailRegex.test(_data.email)) {
    error.flag = true;
    error.email = "Invalid email format";
  }

  if(error.flag){
    return error
  }
let signData={
    username:_data.username,
    password:_data.password,
    email:_data.email
}
const response= await signin(signData)

if(response.ok){
    let res=await response.json()
    redirect("/user/login")
}
  
}
