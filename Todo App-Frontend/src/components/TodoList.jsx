import { useContext, useEffect, useRef, useState } from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TodoItemContext } from "../store/todo-item-store";
import { FaCheckCircle, FaEdit } from "react-icons/fa";

const TodoList = () => {
  const { todoList, deleteTodo, markCompleted, updateItem } =
    useContext(TodoItemContext);
  const [isEdit, setisEdit] = useState(false);
  const inputRef = useRef(null);
  console.log("TodoList at todo ", todoList);
  const handleEdit = (id) => {
   
    setisEdit((prev) => !prev);
    // useEffect(() => {
      if (isEdit) {
        inputRef.current.focus(); // 👈 focus
      }
    // }, [isEdit]);
  };
  const handleSubmit = (event, id) => {
    console.log("The value at event ", inputRef.current.value, id)
    event.preventDefault();
    setisEdit(false);
    updateItem(inputRef.current.value, id);
  };
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
              className="flex items-center justify-between bg-gradient-to-r from-[#f8f6fc] to-[#faf8fe] hover:from-[#f0edf8] hover:to-[#f2eff9] rounded-xl border-2 border-[#c1b0e2] p-4 transition-all duration-300 hover:shadow-md"
              key={item.task}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  onClick={() => markCompleted(item.id)}
                  className="cursor-pointer text-2xl transition-all duration-300 hover:scale-110"
                >
                  {item.completed ? (
                    <FaCheckCircle className="text-[#8D83B7]" />
                  ) : (
                    <RiCheckboxBlankCircleLine className="text-[#A89CCC] hover:text-[#8D83B7]" />
                  )}
                </div>
                {isEdit ? (
                  <form onSubmit={() => handleSubmit(event, item.id)}>
                    <input
                      ref={inputRef}
                      type="text"
                      className={`transition-all duration-300 px-2 py-1 rounded-md border border-purple-400 bg-white outline-none ${
                        item.completed
                          ? "text-[#A89CCC] line-through opacity-60"
                          : "text-gray-700 font-medium"
                      }`}
                      // value={item.task}
                    />
                  </form>
                ) : (
                  <p
                    className={`transition-all duration-300 px-2 py-1 rounded-md ${
                      item.completed
                        ? "text-[#A89CCC] line-through opacity-60"
                        : "text-gray-700 font-medium"
                    }`}
                  >
                    {item.task}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteTodo(item.id)}
                className="text-[#c1b0e2] hover:text-red-500 text-2xl transition-all duration-300 hover:scale-110 ml-2"
              >
                <MdOutlineDeleteSweep />
              </button>
              <button
                onClick={() => handleEdit(item.id)}
                className="text-[#c1b0e2] hover:text-blue-500 text-xl transition-all duration-300 hover:scale-110 ml-2"
              >
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodoList;
