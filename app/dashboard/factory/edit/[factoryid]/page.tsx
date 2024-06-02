import React, { useState } from "react";

import { getFactory } from "@/app/actions/factory";
import FactoryForm from "../../FactoryForm";
 import EditFactory from "./EditFactory";

export default async function page({ params }) {
  const factoryData = await getFactory(params.factoryid);

  return (
    <div className=" w-full mt-3 flex flex-col justify-center items-center">
      <EditFactory data={factoryData}></EditFactory>
    </div>
  );
}
