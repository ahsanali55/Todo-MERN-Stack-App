import { useContext, useState } from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TodoItemContext } from "../store/todo-item-store";
import { FaCheckCircle } from "react-icons/fa";

const TodoList = () => {
  const { todoList, deleteTodo, updateItem } = useContext(TodoItemContext);
  // console.log("TodoList at todo ", todoList)
  return (
    <section className="w-full py-4">
      {todoList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No tasks yet. Add one to get started! 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {todoList?.map((item) => (
            <div
              className="flex items-center justify-between bg-gradient-to-r from-[#f8f6fc] to-[#faf8fe] hover:from-[#f0edf8] hover:to-[#f2eff9] rounded-xl border-2 border-[#e8e4f0] p-4 transition-all duration-300 hover:shadow-md"
              key={item.task}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  onClick={() => updateItem(item.id)}
                  className="cursor-pointer text-2xl transition-all duration-300 hover:scale-110"
                >
                  {item.isChecked ? (
                    <FaCheckCircle className="text-[#8D83B7]" />
                  ) : (
                    <RiCheckboxBlankCircleLine className="text-[#A89CCC] hover:text-[#8D83B7]" />
                  )}
                </div>
                <p
                  className={`transition-all duration-300 ${
                    item.isChecked
                      ? "text-[#A89CCC] line-through opacity-60"
                      : "text-gray-700 font-medium"
                  }`}
                >
                  {item.task}
                </p>
              </div>
              <button
                onClick={() => deleteTodo(item.task)}
                className="text-gray-400 hover:text-red-500 text-2xl transition-all duration-300 hover:scale-110 ml-2"
              >
                <MdOutlineDeleteSweep />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodoList;
