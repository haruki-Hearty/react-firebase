import "./App.css";
import db from "./libs/firebase/init.ts";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteTask } from "./firebase/deleteTask.jsx";
import Button from "./components/button.jsx";
import { addTask } from "./firebase/addTask.js";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]); // タスクリストの状態を管理

  // データベースのフィールドを完了にする
  const toggleComplete = async (id, prevCopleted) => {
    console.log("タスクのID:", id);
    /**
     * チェックしたタスクのidを取得
     * 一致したタスクのinputをcheckedに
     * それとtasksのフィールドを更新
     **/
    const taskRef = doc(db, "task", id);
    await updateDoc(taskRef, {
      conpleted: !prevCopleted,
    });
    fetchData();
  };

  const handleAddTask = async () => {
    if (!title) return;
    try {
      await addTask(title);
      setTitle("");
      fetchData();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTitle("");
      fetchData();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const fetchData = async () => {
    try {
      const taskQuery = query(
        collection(db, "task"),
        orderBy("createdAt", "asc")
      );
      const querySnapshot = await getDocs(taskQuery);
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList); // 状態にセット
    } catch (error) {
      console.log("Error fetching tasks: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="inner mx-auto px-4 max-w-screen-xl">
        <div className="flex justify-center gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button className="flex h-9 items-center justify-center rounded-full bg-gradient-to-b from-gray-50 from-50% to-gray-100 to-50% px-3 text-gray-900 shadow hover:from-gray-100 hover:to-gray-200 active:shadow-none" handleTask={handleAddTask}>追加</Button>
        </div>
        <div className="">
          <ul className="flex flex-col max-w-full mt-8 gap-y-2">
            {tasks.map((task) => (
              <li className="grid grid-cols-3 justify-center place-items-center" key={task.id}>
                <input
                className=""
                  type="checkbox"
                  checked={task.conpleted}
                  onChange={() => toggleComplete(task.id, task.conpleted)}
                />
                {task.title}
                <Button className={`py-1 px-5 bg-red-500 rounded-2xl text-white font-black`} handleTask={() => handleDeleteTask(task.id)}>
                  削除
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
