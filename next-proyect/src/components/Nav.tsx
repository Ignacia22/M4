import Image from 'next/image';
import Link from "next/link";
import { navConfig, NavItem } from "@/config/navConfig";
import UserAvatar from "./UserAvatar";
import Private from './Private';
import CartStatus from './CartStatus';
import SearchBar from './SearchBar';

export default function Nav() {
    return ( 
        <nav className="shadow-md bg-white">
            <div className="md:hidden flex justify-evenly items-center p-6">
                <Link href="/Home" className="flex items-center">
                    <Image 
                        src="https://img.freepik.com/vector-gratis/media-manzana-glifo_78370-4832.jpg?t=st=1734303549~exp=1734307149~hmac=6dbd857c719fb800786c5b204be09e0b94d0a0699d311559e9964e1985b9ae1f&w=740" 
                        alt="Logo" 
                        width={100} 
                        height={40} 
                        className="h-10 w-auto"
                    />
                </Link>
                <button className="rounded-full bg-red-600 text-2xl p-4">
                </button>
            </div>

            {/* Escritorio */}
            <ul className="py-10 text-base text-black font-semibold uppercase md:flex justify-center items-center gap-6 font-sans tracking-[0.2em] hidden">
                
                
                <li>
                    <Link href="/Home" className="mr-28">
                        <Image 
                            src="https://img.freepik.com/vector-gratis/media-manzana-glifo_78370-4832.jpg?t=st=1734303549~exp=1734307149~hmac=6dbd857c719fb800786c5b204be09e0b94d0a0699d311559e9964e1985b9ae1f&w=740" 
                            alt="Logo" 
                            width={120} 
                            height={48} 
                            className="h-12 w-auto"
                        />
                    </Link>
                </li>

                {/* Links */}
                {navConfig.map((el: NavItem) => (
                    !el.isPrivate ? (
                        <li key={el.path} className="relative group">
                            <Link 
                                href={el.path}
                                className="px-4 py-2 hover:text-red-800 transition duration-300"
                            >
                                {el.text}
                            </Link>
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-950 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ) : (
                        <Private key={el.path}>
                            <li className="relative group">
                                <Link 
                                    href={el.path}
                                    className="px-4 py-2 hover:text-red-800 transition duration-300"
                                >
                                    {el.text}
                                </Link>
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-950 transition-all duration-300 group-hover:w-full"></span>
                            </li>
                        </Private>
                    )
                ))}

                {/* Barra de búsqueda */}
                <li className="flex">
                    <SearchBar />
                </li>



               {/* Cart Status */}
                <li>
                    <CartStatus/>
                </li>

                {/* User Avatar */}
                <li>
                    <UserAvatar/>
                </li>
            </ul>
        </nav>
    );
}
