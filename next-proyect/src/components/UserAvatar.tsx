/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link";
import Swal from "sweetalert2";

export default function UserAvatar() {
    const {isAuthenticated, user, logout} = useAuth()

    const salir = () => {
        Swal.fire({
          title: "¿Estás seguro de cerrar sesión?",
          text: "Tu sesión se cerrará y tendrás que iniciar nuevamente para acceder.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, cerrar sesión",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Sesión cerrada",
              text: "Tu sesión ha sido cerrada con éxito.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            logout(); 
          }
        });
      };


    return isAuthenticated ? (
        <div>
         <p>Hi, {user?.name} !</p> 
         <button className="p-2 bg-black text-white" 
         onClick={salir}
         >LOG OUT</button>  
        </div>
    
) : (
    <div>
        <Link href={"/auth/login"}>
        <button className="p-2 bg-black text-white">LOG IN</button>
        </Link>

        <Link href={"/auth/signup"}>
        <button className="p-2 border border-black">SIGN UP</button>
        </Link>
    </div>
);
}