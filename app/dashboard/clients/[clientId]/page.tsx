import React from "react";

import { MdEdit } from "react-icons/md";

import { getClient } from "@/app/actions/clients";
import { MdDelete } from "react-icons/md";

import Link from "next/link";
import DeleteClient from "./DeleteClient";

function Card({data}){
  return (
     
    <div className='p-2 bg-accent cursor-pointer  rounded-lg flex justify-center items-center'>
        {data.name}
    </div>
    
  )
}

export default async function Page({
  params,
}: {
  params: { clientId: string };
}) {
  const { data } = await getClient(params.clientId);
  console.log("Client data", data);

  return (
    <div className="m-2 p-2">
      <div className="flex  mb-3 justify-between items-center">
        <div className="text-2xl font-bold">{data.name}</div>
        <div className="flex gap-4">
          <Link
            href={`/dashboard/clients/edit/${params.clientId}`}
            className="button p-2 rounded-lg cursor-pointer text-2xl"
          >
            <MdEdit />
          </Link>
          <DeleteClient id={data._id}></DeleteClient>
        </div>
      </div>
   
      <div className="border-solid border-black border-2 p-2 rounded-lg ">
        <span className="font-extrabold text-lg">
          Metadata:
        </span>
        <div className="ml-4">
          {data.metadata}
        </div>
      </div>
      
      <div className="border-solid border-black border-2 p-2 mt-2 rounded-lg ">
        <span className="font-extrabold text-lg">
          Categories:
        </span>
        <div className="ml-4 card-grid">
          {data.categories && data.categories.map((e,i)=>{
            return (<Card data={e} key={i}></Card>)
          })}
        </div>
      </div>
      <div className="border-solid border-black border-2 p-2 mt-2 rounded-lg ">
        <span className="font-extrabold text-lg">
          SPL:
        </span>
        <div className="ml-4 card-grid">
          {data.SPLs && data.SPLs.map((e,i)=>{
            return (<Card data={e} key={i}></Card>)
          })}
        </div>
      </div>
    </div>
  );
}
