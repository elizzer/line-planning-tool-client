import { getAllMerchant } from "@/app/actions/merchant";
import React from "react";

import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

function MerchantCard({ name, id }) {
  return (
    <Link href={`/dashboard/merchant/${id}`}>
      <div className="card">{name}</div>
    </Link>
  );
}

function MerchantList({ merchantList }) {
  return (
    <div className="card-grid">
      {merchantList.map((e, i) => {
        return <MerchantCard name={e.name} id={e._id} key={i}></MerchantCard>;
      })}
    </div>
  );
}

export default async function page() {
  const merchants = await getAllMerchant();
  console.log(merchants);
  return (
    <div>
      <div className="flex p-2 justify-between items-center">
        <div className="text-2xl font-bold">Merchants</div>
        <Link
          href={"/dashboard/merchant/create"}
          className="button p-2 rounded-lg cursor-pointer text-2xl"
        >
          <FaPlus />
        </Link>
      </div>
      {merchants && <MerchantList merchantList={merchants.data}></MerchantList>}
    </div>
  );
}
