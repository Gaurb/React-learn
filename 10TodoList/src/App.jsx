import TodoItem from './components/TodoItem';
import ToDoForm from './components/ToDoForm';
import { TodoContextProvider } from './context/TodoContext';
import { useState, useRef, useDebugValue, useEffect } from 'react';


function App() {
  const [todoItem, setTodoItem] = useState([]);


  const addTodo = (msg) => {
    setTodoItem((old) => [{id: Date.now(), ...msg}, ...old]);
  }

  const updateTodo = (id, msg) => {
    setTodoItem((prev)=>prev.map((prevTodo)=>prevTodo.id=== id? {...prevTodo,msg : msg}: prevTodo))
  }

  const deleteTodo = (id) => {
    setTodoItem((prev)=>prev.filter((prevTodo)=>prevTodo.id!==id))
  }

const toggleCompleted=(id)=>{
  setTodoItem((prev)=>prev.map((prevTodo)=>prevTodo.id===id? {...prevTodo,checked : !prevTodo.checked}: prevTodo))
}
useEffect(()=>{
  // console.log(JSON.stringify(todoItem));
  const o=localStorage.setItem("todos",JSON.stringify(todoItem));
  // console.log(o);
},[todoItem])

useEffect(()=>{
  const todos=JSON.parse(localStorage.getItem("todos"));
  console.log(localStorage.getItem("todos"))
  if(todos && todos.length>0)
  setTodoItem(todos);
},[])




  return (
    <TodoContextProvider value={{ todoItem, addTodo, updateTodo, deleteTodo,toggleCompleted }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todoItem.map(item => (
              <div key={item.id} className='w-full'>
              <TodoItem  todo={item} />
              </div>

            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
