import React from "react";

import { MdEdit } from "react-icons/md";


import { getClient } from "@/app/actions/clients";
import Link from "next/link";

export default async function Page({ params }: { params: { clientId: string } }) {

  const { data } = await getClient(params.clientId);
  console.log("Client data", data);

  return (
    <div className="flex p-2 justify-between items-center">
      <div className="text-2xl font-bold">{data.name}</div>
      <Link
        href={`/dashboard/clients/edit/${params.clientId}`}
        className="button p-2 rounded-lg cursor-pointer text-2xl"
      >
        <MdEdit />
      </Link>
    </div>
  );
}
