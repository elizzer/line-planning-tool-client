
import React, { useEffect, useState } from "react";


import { getClient ,editClient} from "@/app/actions/clients";
import EditClient from "./EditClient";

export default async function page({
  params,
}: {
  params: { clientId: string };
}) {
    const {data}=await getClient(params.clientId)

    
  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
      <div className="text-3xl capitalize font-bold">Edit client</div>
      <EditClient data={data} clientId={params.clientId}></EditClient>
    </div>
  );
}
