import "./App.css";
import db from ".";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      if (querySnapshot.empty) {
        console.log("No documents found in the 'posts' collection.");
      } else {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      }
    };
    fetchData();
  }, []);

  // 追加をクリックするとfirestoreにタスクが追加される
  const handleAddTask = async () => {
    //tryブロック内で安全に実行し、問題があればcatchブロックで処理します。
    try {
      //docRefはDocument Reference（ドキュメント参照）
      const docRef = await addDoc(collection(db, "task"), {
        title: title,
      });
      console.log("Document written with ID: ", docRef.id, title);
      setTitle("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => handleAddTask()} disabled={title === ""}>追加</button>
    </div>
  );
}

export default App;
