import "./App.css";
import db from ".";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import DeleteTaskButton from "./components/deleteTaskButton";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]); // タスクリストの状態を管理

  // データベースのフィールドを完了にする
  const handleConpleteTask = async (id, prevCopleted) => {
    console.log("タスクのID:", id)
    /**
     * チェックしたタスクのidを取得
     * 一致したタスクのinputをcheckedに
     * それとtasksのフィールドを更新
     **/
    const taskRef = doc(db, "task", id);
    await updateDoc(taskRef, {
      conpleted: !prevCopleted
    });
    fetchData();
  //   const checked = e.target.checked;
  //   if (checked) {
  //     executeFunction(); // チェック時のみ関数を実行
  //   }
  // };
  // // 実行する関数
  // const executeFunction = async (id) => {
  //   console.log("Checkbox is checked!", id);
  //   他の処理をここに追加
  //   const washingtonRef = doc(db, "task", id);
  //   await updateDoc(washingtonRef, {
  //     conpleted: true
  //   });
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


  // 追加をクリックするとfirestoreにタスクが追加される
  const handleAddTask = async () => {
    //tryブロック内で安全に実行し、問題があればcatchブロックで処理します。
    try {
      //docRefはDocument Reference（ドキュメント参照）
      const docRef = await addDoc(collection(db, "task"), {
        title: title,
        createdAt: new Date(), // 現在時刻を追加
      });
      console.log("Document written with ID: ", docRef.id, title);
      setTitle("");
      fetchData();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // エンターキーが押されたときにタスクを追加する
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && title !== "") {
      handleAddTask();
    }
  };

  return (
    <div className="App">
      <div className="inner">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleAddTask()} disabled={title === ""}>
          追加
        </button>
        <div className="taskList">
          <ul>
            {tasks.map((task) => (
              <li className="taskList" key={task.id}>
                <input type="checkbox" checked={task.conpleted} onChange={() => handleConpleteTask(task.id,task.conpleted)} />
                {task.title}
                <DeleteTaskButton db={db} fetchData={fetchData} id={task.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
