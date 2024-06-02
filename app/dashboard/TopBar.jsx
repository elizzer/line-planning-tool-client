'use client'

import React from "react";
import "./styles.css";

import { CgProfile } from "react-icons/cg";


export default function TopBar({username}) {


  return (
    <div className="top-bar">
      <div className="text-3xl font-bold">Dashboard</div>
      <div className="flex gap-2 items-center">
        <div className="text-3xl font-bold">
          <CgProfile />
        </div>
        <div className="text-xl font-bold">{username}</div>
      </div>
    </div>
  );
}
