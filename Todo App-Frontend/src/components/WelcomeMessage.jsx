import React, { useContext } from 'react'
import { TodoItemContext } from '../store/todo-item-store'


const WelcomeMessage = () => {
    const {todoList} = useContext(TodoItemContext)
  return (
    <>
   { (todoList.length === 0) && (
      <h1 className='max-w-[400px] mx-auto text-center mt-5 text-[#8D83B7] bg-white
      text-[30px] font-bold'>Have a Nice Day!</h1>
    )}
    </>
  )
}

export default WelcomeMessage
