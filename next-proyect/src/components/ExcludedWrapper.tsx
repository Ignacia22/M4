"use client"

import { usePathname } from "next/navigation"


const excludesRoutes = ["/", "/auth/login", "/auth/signup"]

export default function ExcludedWrapped({children}: {children: React.ReactNode}) {

    const path = usePathname()

    if(!excludesRoutes.includes(path))
        return children
}