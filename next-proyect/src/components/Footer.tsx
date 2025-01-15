import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-gray-900 py-10">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Sección 1: Información de la compañía */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nuestra Compañía</h2>
          <p className="text-gray-900 leading-relaxed">
            Ofrecemos la mejor tecnología para tus necesidades. Desde laptops hasta smartphones, siempre con la más alta calidad.
          </p>
        </div>

        {/* Sección 2: Enlaces rápidos */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Enlaces Rápidos</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/Home" className="hover:text-slate-500 transition duration-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-slate-500 transition duration-200">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-slate-500 transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-slate-500 transition duration-200">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección 3: Redes sociales */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Síguenos</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-blue-400 transition duration-200">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="hover:text-sky-400 transition duration-200">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="hover:text-pink-500 transition duration-200">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="hover:text-red-500 transition duration-200">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 mt-8"></div>

      {/* Derechos reservados */}
      <div className="text-center mt-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Nuestra Compañía. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
