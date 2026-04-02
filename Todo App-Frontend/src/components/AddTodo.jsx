import React, { use, useContext, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TodoItemContext } from "../store/todo-item-store";

const AddTodo = () => {
  const itemvalue = useRef();
  const { addTodo } = useContext(TodoItemContext);
  const [isFocused, setFocused] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemvalue.current.value.trim()) {
      addTodo(itemvalue.current.value);
      itemvalue.current.value = "";
      setFocused(false);
    }
  };
  return (
    <section className="w-full py-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className={`bg-[#f6f4fa] p-4 rounded-xl flex gap-x-3 items-center w-full transition-all duration-300 ${
            isFocused
              ? "border-2 border-[#8D83B7] shadow-lg"
              : "border-2 border"
          }`}
        >
          <FaPlus
            className={`text-xl transition-colors ${isFocused ? "text-[#8D83B7]" : "text-gray-300"}`}
          />
          <input
            type="text"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Add a new task..."
            className="flex-1 bg-inherit border-none outline-none text-gray-700 placeholder-gray-400 "
            ref={itemvalue}
          />
          <button
            type="submit"
            className="bg-red-500  font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTodo;
