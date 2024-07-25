'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function getToken(){
    const token = cookies().get("line-planner-jwt-token")?.value;

    if (!token) {
        console.error("JWT token not found in cookies.");
        redirect("/user/login");
    }
    return token
}