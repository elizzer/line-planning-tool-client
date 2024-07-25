'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface LoginCreds {
    username: string;
    password: string;
}

async function login(creds: LoginCreds) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/user/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
            cache:"no-cache"
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occurred during login:', error);
        throw error;
    }
}

export default async function loginAction(prevState: any, loginFormData: FormData) {
    console.log('[+] User login request', loginFormData.get('username'));

    try {
        const res = await login({
            username: loginFormData.get('username') as string,
            password: loginFormData.get('password') as string
        });

        console.log(res);

        if (!res.error) {
            // Set up cookie
            cookies().set("line-planner-jwt-token", res.data.token);
            cookies().set("line-planner-jwt-name", res.data.username);
            cookies().set("line-planner-jwt-expTime", res.data.expTime);
            redirect("/dashboard")
        }

        return {
            message: res.message
        };
    } catch (error) {
        console.error('Error occurred during login:', error);
        throw error;
        
    }
}
