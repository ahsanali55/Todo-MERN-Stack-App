import React, { use, useContext, useRef, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { TodoItemContext } from '../store/todo-item-store';

const AddTodo = () => {
    const itemvalue = useRef();
    const { addTodo }  = useContext(TodoItemContext);
    const [isFocused, setFocused] = useState(false)


    const handleSubmit = (event) => {
        event.preventDefault();
      
        addTodo(itemvalue.current.value);
        itemvalue.current.value = "";
    }
  return (
    <section className='w-full py-4 max-w-[400px] bg-white mx-auto'>
      <div className={`bg-[#f6f4fa] p-4 rounded-lg flex gap-x-4 items-center w-full  ${isFocused ? "border border-[#e2ddf3]": ""}`}>
        <FaPlus className='bg-inherit text-gray-300' />
        <form action="" className={`w-full bg-inherit `}  onSubmit={handleSubmit}>
        <input type="text" onFocus={() => {setFocused(true)
            
        }} name="" id="" placeholder='Add a task'  className='w-full bg-inherit border-none outline-none' ref={itemvalue} />
        </form>
      </div>
    </section>
  )
}

export default AddTodo
