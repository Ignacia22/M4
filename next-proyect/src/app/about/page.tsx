import Image from "next/image";

export default function About() {
    return (
        <div className="flex w-full h-screen py-20 bg-black">
            <div className="relative z-10 p-6 sm:p-12 max-w-4xl mx-auto flex items-center justify-center flex-col h-full text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg">
                    ABOUT US
                </h1>
                <p className="text-[1em] sm:text-[1.2em] mb-8 px-20">
                    Bienvenido a Pineapple, tu destino en línea para los mejores dispositivos electrónicos. Nos especializamos en ofrecer celulares, tablets y accesorios de última tecnología a precios competitivos. Sabemos que elegir el dispositivo adecuado puede ser un desafío, por lo que trabajamos arduamente para brindarte una experiencia de compra sencilla, segura y satisfactoria.


                </p>
            </div>

            <div className="w-1/2 h-full overflow-hidden relative">
                <Image 
                    src="https://images.pexels.com/photos/9781032/pexels-photo-9781032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="airphones"
                    layout="fill"
                    objectFit="cover"
                    quality={100} 
                />
            </div>
        </div>
    );
}
