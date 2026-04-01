import { useState } from 'react'
import { FaBeer } from 'react-icons/fa';
import './App.css'
import NavBar from './components/NavBar';
import Heading from './components/Heading';
import AddTodo from './components/AddTodo';
import TodoItemProvider from './store/todo-item-store';
import TodoList from './components/TodoList';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  const [count, setCount] = useState(0)

  return (

    <TodoItemProvider >
      <div className='w-[30%] mx-auto my-8 min-h-[500px] bg-white rounded-2xl'>
      <NavBar />
      <Heading />
      <AddTodo />
      <WelcomeMessage />
      <TodoList />
      </div>
    </TodoItemProvider>
  
  )
}

export default App
