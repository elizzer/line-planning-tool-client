"use client";

import React, { useEffect, useState } from "react";

import "./styles.css";
import { FaHome } from "react-icons/fa";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { MdFactory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FaTshirt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";


export default function SideBar() {

  const path = usePathname();

  return (
    <div className="side-bar">
      <Link href="/dashboard">
        <div
          className={`side-bar-icons ${
            path === "/dashboard" ? "selected" : ""
          }`}
        >
          <FaHome />
        </div>
      </Link>
      <Link href="/dashboard/clients">
        <div
          className={`side-bar-icons ${
            path.includes("/dashboard/clients") ? "selected" : ""
          }`}
        >
          <HiAcademicCap />

        </div>
      </Link>
      <Link href="/dashboard/factory">
        <div
          className={`side-bar-icons ${
            path.includes("/dashboard/factory") ? "selected" : ""
          }`}
        >
          <MdFactory />
        </div>
      </Link>
      <Link href="/dashboard/merchant">
        <div
          className={`side-bar-icons ${
            path.includes("/dashboard/merchant") ? "selected" : ""
          }`}
        >
          <GrUserWorker />
        </div>
      </Link>
      <Link href="/dashboard/jobs">
        <div
          className={`side-bar-icons ${
            path.includes("/dashboard/jobs") ? "selected" : ""
          }`}
        >
          <FaTshirt />

        </div>
      </Link>
    </div>
  );
}
