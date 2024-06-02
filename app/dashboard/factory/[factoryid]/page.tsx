import { getFactory } from "@/app/actions/factory";
import React from "react";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";


function LineCard({name,id}){
    return(
        <Link href={`/dashboard/line/${id}`}>
             <div className='p-2 bg-accent cursor-pointer  rounded-lg flex justify-center items-center'>
                {name}
            </div>
        </Link>
    );
}

function LineList({lineList}){
    return(
        lineList.map((e,i)=>{
            return <LineCard name={e.name} key={i} id={e._id} ></LineCard>
        })
    );
}

export default async function page({
  params,
}: {
  params: { factoryid: string };
}) {

  const factoryData = await getFactory(params.factoryid);
    console.log(factoryData)
  return (
    <div>
        <div className="flex p-2 justify-between items-center">
          <div className="text-2xl font-bold">{factoryData.name}</div>
          <Link
            href={`/dashboard/factory/edit/${params.factoryid}`}
            className="button p-2 rounded-lg cursor-pointer text-2xl"
          >
            <MdEdit />
          </Link>
        </div>
        <div>
        <div className='flex p-2 justify-between items-center'>
            <div className='text-2xl font-bold'>
                Lines
            </div>
            <Link href={`/dashboard/line/create?factoryId=${params.factoryid}`} className='button p-2 rounded-lg cursor-pointer text-2xl'>
                <FaPlus />
            </Link>
        </div>
            <div className="card-grid">
                {factoryData&& <LineList lineList={factoryData.lines}></LineList>}
            </div>
        </div>
    </div>
  );
}
