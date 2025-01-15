import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  return (
    <div>
      {/* Sección de bienvenida */}
      <div className="w-full h-screen relative flex items-center justify-center flex-col text-center">
        <div className="absolute inset-0 -z-10 opacity-50">
          <Image
            src="https://files.oaiusercontent.com/file-1ujLLx6rN39urwYjRJLteU?se=2024-12-16T02%3A19%3A43Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dddae83de-90c7-4c6f-8381-1de28bc91df4.webp&sig=fqTkEk/oCkx/Gg//qDmkD3o1ipJ%2B9bxNpLYQfZyq%2BQQ%3D"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl font-sans bg-gradient-to-r from-slate-300 to-white inline-block text-transparent bg-clip-text">
            WELCOME
          </h1>
          <p className="text-lg sm:text-xl lg:text-xl font-medium text-gray-200 drop-shadow-lg max-w-4xl mx-auto leading-relaxed px-6 pb-8">
          ¡Celebra la Navidad con la mejor tecnología! Explora nuestra colección de laptops, auriculares, smartphones y más, todo con increíbles descuentos navideños. 🎁✨ ¡Regala momentos únicos!
          </p>
          <Link href="/Home">
            <button className="bg-white text-black hover:text-white hover:bg-slate-700 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
              GO HOME
            </button>
          </Link>
        </div>
      </div>

      {/* Sección de imagen y texto */}
<div className="flex w-full h-screen py-20 bg-black">
 
  <div className="w-1/2 h-full overflow-hidden">
    <Image
      src="https://images.pexels.com/photos/5486786/pexels-photo-5486786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Gift"
      layout="responsive"
      width={500}  
      height={500} 
      objectFit="cover"
    />
  </div>

  {/* Columna del texto */}
  <div className="relative z-10 p-6 sm:p-12 max-w-4xl mx-auto flex items-center justify-center h-full text-white">
    <div>
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg">
        ¡Descuentos Especiales de Navidad! 🎄
      </h1>
      <p className="text-lg sm:text-xl mb-8">
        ¡Hasta un 50% de descuento en productos seleccionados! 🎁 Aprovecha nuestras ofertas limitadas y haz tus compras navideñas al mejor precio. ¡Solo hasta fin de año!
      </p>
      <Link href="/productos">
        <button className="bg-white hover:bg-slate-700 hover:text-white text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
          ¡Compra Ahora y Ahorra!
        </button>
      </Link>
    </div>
  </div>
</div>
    </div>
  );
}

