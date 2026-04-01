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
    <TodoItemProvider>
      <div className='min-h-screen bg-gradient-to-br from-[#f8f6fC] via-[#faf8fe] to-[#f6f4fa] py-8 px-4'>
        <div className='w-full max-w-[500px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden'>
          <NavBar />
          <div className='px-6 py-6'>
            <Heading />
            <AddTodo />
            <WelcomeMessage />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoItemProvider>
  )
}

export default App
