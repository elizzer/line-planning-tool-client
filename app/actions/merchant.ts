"use server";

import getToken from "./getToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getMerchant(id: string) {
    const merchantResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/merchant/${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${await getToken()}`,
          },
          cache: "no-cache",
        }
      );
    
      if (merchantResponse.status === 401) {
        redirect("/user/login");
      }
    
      const merchantResponseJson = await merchantResponse.json();
      return merchantResponseJson;
}

export async function getAllMerchant() {
  const merchantResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/merchant`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-cache",
    }
  );

  if (merchantResponse.status === 401) {
    redirect("/user/login");
  }

  const merchantResponseJson = await merchantResponse.json();
  return merchantResponseJson;
}

export async function updateMerchant(id: string, formdata:any) {
  const merchantResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/merchant/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify(formdata),
      cache: "no-cache",
    }
  );

  if (merchantResponse.status === 401) {
    redirect("/user/login");
  }

  const merchantResponseJson = await merchantResponse.json();
  if (merchantResponseJson.error) {
    return merchantResponseJson.message;
  }else{
    redirect('/dashboard/merchant/') 
  }
}


export async function createMerchant(formdata:any){
    console.log(formdata)
    const merchantResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/merchant/`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify(formdata),
          cache: "no-cache",
        }
      );
    
      if (merchantResponse.status === 401) {
        console.log("Unauthorized user")
        redirect("/user/login");
      }
    
      const merchantResponseJson = await merchantResponse.json();
      if (merchantResponseJson.error) {
        return merchantResponseJson.message;
      }else{
        //redirect back 
        redirect("/dashboard/merchant")
      }
}
