import React from "react";
import { getFactories } from "@/app/actions/factory";
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link';
import FactoryList from "./FactoryList";


export default async function page() {
  const factoryList = await getFactories();
  // const factoryList = "";
  console.log(factoryList)
  return (
    <div>
        <div className='flex p-2 justify-between items-center'>
            <div className='text-2xl font-bold'>
                Factories
            </div>
            <Link href={"/dashboard/factory/create"} className='button p-2 rounded-lg cursor-pointer text-2xl'>
                <FaPlus />
            </Link>
        </div>
        {factoryList && <FactoryList factoryList={factoryList}></FactoryList>}
    </div>
  );
}
