import { useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [taskls, setTaskls] = useState([]);
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  const add = () => {
    if (!task.trim()) return;
    setTaskls([...taskls, task]);
    setTask("");
  };

  const remove = (index) => {
    setTaskls(taskls.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditTask(taskls[index]);
  };

  const update = () => {
    if (!editTask.trim()) return;
    setTaskls(taskls.map((t, i) => (i === editingIndex ? editTask : t)));
    setEditingIndex(null);
    setEditTask("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">To-Do List</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={add}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {taskls.map((t, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-200 p-3 rounded-lg"
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <p className="text-gray-800">{t}</p>
              )}

              <div className="flex gap-2">
                {editingIndex === index ? (
                  <button
                    onClick={update}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
