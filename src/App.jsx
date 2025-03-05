import "./App.css";
import db from ".";
import { collection, getDocs} from "firebase/firestore";
import { useEffect } from "react";

function App() {
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

  const handleAddTask = () => {
    alert('サンプル')
  }
  return (
    <div className="App">
      <button onClick={() => handleAddTask()}>追加</button>
    </div>
  );
}

export default App;
