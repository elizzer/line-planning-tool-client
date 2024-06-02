'use server'

import { redirect } from "next/navigation";
import getToken from "./getToken";
import { Line } from "./line";

export interface Factory{
    _id: string;
    userID: string;
    name: string;
    metadata: string;
    lines:Array<Line>|undefined;
}

export async function getFactories(){
    console.log('===========')
    const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/factory`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        // cache:"no-cache"
    })
    const body = await res.json()
    if(res.status===401){
        console.log(body.message)
        redirect("/user/login")
    }
    if(!body.error){
        return body.data
    }else{
        console.log(body.message)
    }
}

export async function getFactory(factoryId:string){
    const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URI}/factory/${factoryId}`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        // cache:"no-cache"
    })
    if(res.status===401){
        redirect("/user/login")
    }
    const body = await res.json()
    if(!body.error){
         return body.data
    }else{
        console.log(body.message)
    }
}

export async function createFactory(factoryData:Factory){
    console.log('[+]Creating facroty ',factoryData)
    const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/factory`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        body:JSON.stringify(factoryData),
        cache:"no-cache"
    })

    
    if(res.status===401){
        console.log("Unauthorized")
        redirect("/user/login")
    }

    const body=await res.json()
    if(!body.error){
        redirect("/dashboard/factory")
    }else{
        console.log(body.message)
        return body.message
    }
}

export async function updateFactory(factoryData:Factory,id:String){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/factory/${id}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${await getToken()}`
        },
        body:JSON.stringify(factoryData),
        cache:"no-cache"
    })
      
    if(res.status===401){
        console.log("Unauthorized")
        redirect("/user/login")
    }
    const body=await res.json()
    if(!body.error){
        redirect("/dashboard/factory")
    }else{
    
        return body.message
    }
}