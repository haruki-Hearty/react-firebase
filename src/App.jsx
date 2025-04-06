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
  const handleConpleteTask = async (id, prevCopleted) => {
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
      <div className="inner">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button handleTask={handleAddTask}>追加</Button>
        <div className="taskList">
          <ul>
            {tasks.map((task) => (
              <li className="taskList" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.conpleted}
                  onChange={() => handleConpleteTask(task.id, task.conpleted)}
                />
                {task.title}
                <Button handleTask={() => handleDeleteTask(task.id)}>
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
