// app/page.tsx
import { ProductsProvider } from "@/context/ProductsContext";
import ProductsContainer from "@/components/ProductsContainer";
import Image from "next/image";

export default function Home() {
  return (
    <ProductsProvider>
      <div className="px-4 sm:px-6 lg:px-0">
      <div className="w-full h-screen relative">
          <div className="relative w-full h-screen sm:h-screen mb-8">
            <Image
              src="https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <h1 className="text-balance text-2xl sm:text-2xl lg:text-5xl font-extrabold text-white mb-6 drop-shadow-lg font-sans">
             Vive la experiencia Pineapple
            </h1>
            <p className="mt-8 mb-5 text-pretty text-lg font-medium text-white sm:text-xl/8">
            Explora nuestra selección de los últimos y mejores productos Pineapple. Desde PinePhone hasta PineBook, tenemos todo lo que necesitas para que tu tecnología fluya a la perfección. ¡Sumérgete en el mundo Pineapple y toma tu próximo dispositivo al siguiente nivel!
            </p>
          </div>
        </div>
        

        
        <h1 className="text-center justify-center text-5xl sm:text-3xl items-center font-sans font-bold py-6 m-6 tracking-[0.4em]">
          PRODUCTOS
        </h1>
        <ProductsContainer />
      </div>
    </ProductsProvider>
  );
}