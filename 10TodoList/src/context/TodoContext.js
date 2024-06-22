import React, { useContext } from "react";
import TodoItem from "../components/TodoItem";

export const TodoContext=React.createContext(
    {
        todoItem:[
            // {
            //     id:1,
            //     msg:"To Do msg",
            //     checked:false
            // }
        ],
        addTodo:(msg)=>{},
        updateTodo:(id,msg)=>{},
        deleteTodo:(id)=>{},
        toggleCompleted:(id)=>{}
    }
);

export const TodoContextProvider=TodoContext.Provider

export default function useTodoContext(){return useContext(TodoContext)};
