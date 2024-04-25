"use client"
import { redirect } from "next/navigation";
import { useState } from "react";
import userRegister from "@/libs/userRegister";
import userLogin from "@/libs/userLogin";
import { signIn, useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import getUserProfile from "@/libs/getUserProfile";

export default function RegisterPage(){
    // const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [tel, setTel] = useState('');


    const addUser = async () => {
        await signIn("signin",{
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/",
        })
    }

    return(
        <main className = 'bg-gray-100 min-h-screen flex items-center justify-center'>            
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-3xl text-center text-gray-800 mb-6">Login</h1>
                <form action={addUser} className="space-y-4">
                    

                        <label className = 'w-auto block text-gray-700 pr-4' htmlFor='email'>Email</label>
                        <input type = 'text' required id='email' name='email' placeholder = 'Email' onChange={(event)=>{setEmail(event.target.value)}} className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />

                      
                        <label className = 'w-auto block text-gray-700 pr-4' htmlFor='password'>Password</label>
                        <input type = 'text' required id='password' name='password' placeholder = 'password' onChange={(event)=>{setPassword(event.target.value)}} className = 'bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />

                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded' >Login</button>
                </form>
            </div>
        </main>
    )
}