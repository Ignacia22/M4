/* eslint-disable react/jsx-key */
"use client";

import { useAuth } from "@/context/AuthContext";
import { usePrivate } from "@/hooks/usePrivate";
import { IOrder } from "@/Interface/IOrder";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";



export default function Dashboard() {
    const { user, token } = useAuth();
    const [userOrders, setUserOrders] = useState<IOrder[]>([]);
    usePrivate();

    useEffect(() => {
        if (!token) return;

        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`, {
                headers: {
                    authorization: token,
                },
            })
            .then((res) => {
                setUserOrders(res.data);
            })
            .catch(() => {
                Swal.fire("Error to get product");
            });
    }, [token]);

    

    return (
        <div className="bg-black min-h-screen py-10 px-4 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-white text-black border-b-4 border-slate-300 p-6">
                    <h1 className="text-2xl font-bold">BIENVENIDO, {user?.name || "Usuario"}</h1>
                    <p className="mt-1 text-sm">Aquí puedes gestionar tu cuenta y pedidos.</p>
                </div>
                <div className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">Información Personal</h2>
                    <div className="space-y-2">
                        <p className="text-gray-800">
                            <span className="font-semibold">Nombre:</span> {user?.name || "N/A"}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-semibold">Dirección:</span> {user?.address || "N/A"}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-semibold">Teléfono:</span> {user?.phone || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Pedidos */}
                <div className="border-t border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-700">Pedidos</h2>
                    {userOrders?.length ? (
                        <div>
            {userOrders.map((order) => (
                <div
                    key={order.id}
                    className="bg-gray-50 p-4 rounded shadow-sm flex items-start justify-between space-y-4"
                >
                    {/* Info del pedido */}
                    <div>
                        <p className="text-sm text-gray-600">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-600">
                            Fecha: {new Date(order.date).toLocaleString()}
                        </p>
                    </div>

                    {/* Información de productos dentro del pedido */}
                    <div className="space-y-2">
                    
                    {Array.isArray(order.products) && order.products.length ? (
                        order.products.map((product) => (
                            <div key={product.id} className="flex justify-between">
                                <p className="text-sm text-gray-600">{product.name} </p>
                                <p className="text-sm text-gray-600"> ${product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-600">No hay productos en este pedido</p>
                    )}
                </div>
                    <span className="text-sm font-medium text-green-600">Realizada</span>
                </div>
            )
            )}
        </div>
    ) : (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
            No tienes pedidos pendientes.
        </div>
    )}
</div>

            </div>
        </div>
    );
}
