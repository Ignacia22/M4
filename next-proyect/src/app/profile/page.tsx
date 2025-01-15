"use client"

import { useAuth } from "@/context/AuthContext"


export default function Profile() {
    const {user} = useAuth();
    return(
        <div>
            <div>
                <h1 className="text-white">{user?.name}</h1>
                <p>{user?.email}</p>
            </div>
        </div>
    )
}