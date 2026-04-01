import { useContext, useState } from 'react'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TodoItemContext } from '../store/todo-item-store';
import { FaCheckCircle } from "react-icons/fa";

const TodoList = () => {
    const  { todoList, deleteTodo, updateItem }  = useContext(TodoItemContext);
 
  return (
    <section className='w-full max-w-[400px] mx-auto py-4 bg-white'>

        {todoList.map(item => (
            <div className='flex items-center justify-between bg-white rounded-lg border-[1px] p-3' key={item.value}>
            <div className='flex items-center bg-inherit space-x-4'>
               <div onClick={() => updateItem(item.id)} className='cursor-pointer bg-inherit'>{item.isChecked ? <FaCheckCircle  className='bg-inherit text-[20px] text-[#8D83B7]' /> :  <RiCheckboxBlankCircleLine className='bg-inherit text-[20px] text-[#8C889E]'/>}
              
               </div>
                <p className={`bg-inherit ${item.isChecked? "text-[#8D83B7]": ""}`}>{item.value}</p>
            </div>
            <MdOutlineDeleteSweep className='bg-inherit  text-[20px] text-gray-400' onClick={() => deleteTodo(item.value)} />
        </div>
        ))}
      
    </section>
  )
}

export default TodoList
