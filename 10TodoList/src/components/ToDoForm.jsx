import React, { useEffect, useState } from 'react'
import useTodoContext from '../context/TodoContext';

function TodoForm() {
    const [text, settext] = useState('')

    const { addTodo } = useTodoContext();


    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo({msg:text, checked:false})
    }



    return (
        <form
            className="flex"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => settext(e.target.value)}
                value={text}
            />
            <button
                type="submit"
                className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;

