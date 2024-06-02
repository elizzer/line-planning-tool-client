import React from 'react'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FaPlus } from "react-icons/fa6";
import ClientList from "./ClientList"

async function getClients(){
 
    const token = cookies().get("line-planner-jwt-token")?.value;

    if (!token) {
        console.error("JWT token not found in cookies.");
        redirect("/user/login");
        return null; // Returning null since there's no token to make the request
    }

    const clientsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/clients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        cache:"no-cache"
    });

    console.log("Clients response received");
    const clientsData = await clientsResponse.json();


    if (clientsResponse.status === 401) {
        console.error("User unauthorized",clientsData.message);
        redirect("/user/login");
    }

    return clientsData;

}

export default async function page() {
  const clientData= await getClients()
  console.log(clientData)
  return (
    <div>
      {clientData && <ClientList data={clientData.data}></ClientList>}
    </div>
  )
}
