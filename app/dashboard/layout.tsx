import React from 'react'

import TopBar from "./TopBar"
import SideBar from "./SideBar"

import "./styles.css"
import { cookies } from 'next/headers';

export default function layout({children}:{
    children: React.ReactNode
  }) {

    const name=cookies().get("line-planner-jwt-name")?.value
    
    return (
        
        <div className='dash-grid'>
            <TopBar username={name}></TopBar>
            <SideBar></SideBar>
            <div className='content'>     
              {children}
            </div>
        </div>
      );
}
