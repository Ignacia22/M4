/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"


import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";


import Swal from "sweetalert2";

export default function Cart() {
  const { items, removeItemFromCart, emptyCart, getCartTotal, countItems } = useCart();
  const {token, user, isAuthenticated} = useAuth();
  const router = useRouter()


  const handlePurchase = () => {

  if (!isAuthenticated || !token || !user) {
    Swal.fire({
      title: "Inicia sesión",
      text: "Debes estar logueado para realizar una compra.",
      icon: "info",
      confirmButtonText: "Ir al login",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/auth/login");
      }
    });
    return;
  }




    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡comprar!",
      }).then((result) => {
        if (result.isConfirmed) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
                userId: user?.id,
                products: items.map((e) => e.id)
            }, {
                headers: {
                    authorization: token,
                }
            })
            .then((res) => {
                Swal.fire({
                  title: "Success",
                  text: "Purchase made successfully",
                  icon: "success",
                });
                emptyCart();
                router.push("/dashboard")

            }) .catch((error) => {
                console.log(error)
            })
        }
      });
  };

  const emptyCartHandler = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu carrito ha sido vaciado.",
          icon: "success",
        });
        emptyCart();
      }
    });
  };



  return (
    <div className="h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold my-6">Tu Carrito</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">El carrito está vacío</p>
      ) : (
        <div className="bg-black rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-800 font-bold">
                <th className="py-4 px-6 text-left">Producto</th>
                <th className="py-4 px-6 text-right">Precio</th>
                <th className="py-4 px-6 text-right">Cantidad</th>
                <th className="py-4 px-6 text-right">Total</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-4 px-6 font-medium">{item.name}</td>
                  <td className="py-4 px-6 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">{countItems(item.id)}</td>
                  <td className="py-4 px-6 text-right">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">
                    <button
        onClick={() => removeItemFromCart(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Eliminar
      </button>
    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex flex-col space-y-4 items-center">
        <p className="text-gray-700 font-bold">Total: ${getCartTotal().toFixed(2)}</p>
        <button
        onClick={emptyCartHandler}
        disabled={items.length === 0}
        className={`w-1/2 py-2 px-4 rounded font-sans font-semibold ${
      items.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-white text-black hover:text-white hover:bg-slate-700"
    }`}
  >
    Vaciar Carrito
  </button>
  <button
  onClick={handlePurchase}
    disabled={items.length === 0}
    className={`w-1/2 py-2 px-4 rounded font-sans font-semibold ${
      items.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "border-2 border-white text-white hover:bg-slate-700"
    }`}
  >
    Comprar
  </button>
      </div>
    </div>
  );
}

