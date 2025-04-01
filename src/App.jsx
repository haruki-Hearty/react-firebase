import "./App.css";
import db from ".";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import DeleteTaskButton from "./components/deleteTaskButton";
import AddTaskButton from "./components/addTaskButton";

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
        <AddTaskButton
          title={title}
          fetchData={fetchData}
          setTitle={setTitle}
        />
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
                <DeleteTaskButton fetchData={fetchData} id={task.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
