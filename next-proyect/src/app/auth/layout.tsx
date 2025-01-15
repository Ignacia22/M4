import Image from 'next/image';


export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
        <div>
          <div className="flex flex-row bg-green-500 h-screen items-center">
            <div className="w-1/2 h-full relative">
            <Image
              src="https://images.pexels.com/photos/7537255/pexels-photo-7537255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="formulario"
              fill
              style={{
                objectFit: "cover",
                }}
            />
              </div>
                <div className="bg-black w-1/2 h-full flex items-center justify-center">{children}</div>
            </div>
        </div>
      
    );
  }  