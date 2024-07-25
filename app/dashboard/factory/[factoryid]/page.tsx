import { getFactory } from "@/app/actions/factory";
import React from "react";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import DeleteFactory from "./DeleteFactory";

function LineCard({ name, id }) {
  return (
    <Link href={`/dashboard/line/${id}`}>
      <div className="card">
        {name}
      </div>
    </Link>
  );
}

function LineList({ lineList }) {
  return lineList.map((e, i) => {
    return <LineCard name={e.name} key={i} id={e._id}></LineCard>;
  });
}

export default async function page({
  params,
}: {
  params: { factoryid: string };
}) {
  const factoryData = await getFactory(params.factoryid);
  console.log(factoryData);
  return (
    <div className="p-2">
      <div className="flex p-2 justify-between items-center">
        <div className="text-2xl font-bold">{factoryData.name}</div>
        <div className="flex gap-4">
          <Link
            href={`/dashboard/factory/edit/${params.factoryid}`}
            className="button p-2 rounded-lg cursor-pointer text-2xl"
          >
            <MdEdit />
          </Link>
          <DeleteFactory id={params.factoryid}></DeleteFactory>
        </div>
      </div>
      <div className="metadata-container">
        <h2 className="metadata-title ">Metadata:</h2>
        <p className="metadata-text">{factoryData.metadata}</p>
      </div>
      <div>
        <div className="flex p-2 justify-between items-center">
          <div className="text-2xl font-bold">Lines</div>
          <Link
            href={`/dashboard/line/create?factoryId=${params.factoryid}`}
            className="button p-2 rounded-lg cursor-pointer text-2xl"
          >
            <FaPlus />
          </Link>
        </div>
        <div className="card-grid">
          {factoryData && <LineList lineList={factoryData.lines}></LineList>}
        </div>
      </div>
    </div>
  );
}
