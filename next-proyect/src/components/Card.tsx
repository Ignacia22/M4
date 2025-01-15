/* eslint-disable @next/next/no-img-element */
interface CardProps {
    name: string,
    price: number,
    description: string,
    stock: number,
    image: string,
    onAddToCart?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onToggleFavorite?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean;
    isFavorite?: boolean;
}

export default function Card({
    name, 
    price, 
    description, 
    stock, 
    image, 
    onAddToCart,
    onToggleFavorite,
    disabled = false,
    isFavorite = false,
}: CardProps) {
    return (
        <div className="w-64 border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white text-black relative">
            {/* Botón de favoritos */}
            {onToggleFavorite && (
                <button 
                    onClick={onToggleFavorite}
                    className="absolute top-2 right-2 z-10 bg-slate-300 rounded-full p-1 shadow-md"
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            )}

            <img src={image} alt={name} className="w-full object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-500 text-sm mb-2">{description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">${price}</span>
                    <span className={`text-sm font-medium ${stock > 0 ? "text-gray-600" : "text-red-500"}`}>
                        {stock > 0 ? `Stock: ${stock}` : "Out of Stock"}
                    </span>
                </div>

                {/* Botón de agregar al carrito */}
                {onAddToCart && (
                    <button 
                        onClick={onAddToCart}
                        disabled={disabled}
                        className={`w-full bg-gray-950 text-white px-4 py-2 rounded-lg mt-2 ${
                            disabled ? "cursor-not-allowed bg-gray-400" : "hover:bg-slate-800"
                        } transition-colors`}
                    >
                        {disabled ? "Already in Cart" : "Add to Cart"}
                    </button>
                )}
            </div>
        </div>
    )
}