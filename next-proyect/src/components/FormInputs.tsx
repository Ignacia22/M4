/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FormInputs({
    name, label, type, value, onChange, placeholder
}: {
    name: string,
    label: string,
    type:  string,
    value: any,
    onChange: (e: any) => void,
    placeholder: string,
}) {
    return (
        <div className="flex flex-col">
                    <label htmlFor={name}>{label}</label>
                 <input 
                 type={type} 
                 name={name} 
                 value={value} 
                 onChange={onChange}
                 className="w-[25em] h-[4em] rounded-xl bg-transparent text-white pl-4 border-2 border-white font-sans"
                 placeholder={placeholder}
                 />
               </div>
    )
}