import React,{useId} from 'react'

const Input = React.forwardRef(
    function Input({
        type = 'text',
        placeholder = '',
        lable,
        value = '',
        onChange = () => { },
        className = '',
        ...props
    }, ref) {
        const id = useId()
        return (
            <div className='w-full'>
                {lable &&
                    <label
                        className='inline-block mb-2 pl-1 text-gray-700 font-medium'
                        htmlFor={id}>
                        {lable}
                    </label>
                }
                <input
                    type={type}
                    className={` 
                px-4 py-3 rounded-xl
                 bg-white/70 backdrop-blur-sm
                 text-gray-800 outline-none
                 focus:bg-white focus:ring-2 focus:ring-blue-500
                 duration-200 border border-gray-300 w-full
                 hover:border-blue-400 transition-all
                 placeholder:text-gray-500
                ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    })

export default Input