import React from "react";

import { MdEdit } from "react-icons/md";

import { getClient } from "@/app/actions/clients";


import Link from "next/link";
import DeleteClient from "./DeleteClient";

function Card({data}){
  return (
     
    <div className='card '>
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
    <div className="m-4 p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="flex mb-6 justify-between items-center">
        <div className="text-3xl font-bold text-gray-900">{data.name}</div>
        <div className="flex gap-4">
          <Link
            href={`/dashboard/clients/edit/${params.clientId}`}
            className="button p-2 rounded-lg bg-blue-500 text-white cursor-pointer flex items-center gap-2"
          >
            <MdEdit className="text-xl" />
            <span>Edit</span>
          </Link>
          <DeleteClient id={data._id} />
        </div>
      </div>
      
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="font-extrabold text-lg mb-2 text-gray-800">Metadata:</h2>
        <div className="ml-4 text-gray-700">
          {data.metadata}
        </div>
      </div>
      
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="font-extrabold text-lg mb-2 text-gray-800">Categories:</h2>
        <div className="ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.categories && data.categories.map((category, index) => (
            <Card data={category} key={index} />
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="font-extrabold text-lg mb-2 text-gray-800">SPL:</h2>
        <div className="ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.SPLs && data.SPLs.map((spl, index) => (
            <Card data={spl} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
