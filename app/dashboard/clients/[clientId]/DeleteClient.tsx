"use client";

import { deleteClient } from "@/app/actions/clients";
import React from "react";

import { MdDelete } from "react-icons/md";

export default function DeleteClient({ id }) {
  async function deleteHandler() {
    await deleteClient(id);
  }
  return (
    <div
      onClick={deleteHandler}
      className="red-button p-2  rounded-lg cursor-pointer text-2xl"
    >
      <MdDelete />
    </div>
  );
}
