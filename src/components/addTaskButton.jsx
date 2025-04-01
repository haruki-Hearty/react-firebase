import { addDoc, collection } from "firebase/firestore";
import db from "../";
// 追加をクリックするとfirestoreにタスクが追加される
const AddTaskButton = (props) => {
  const { title, fetchData, setTitle, } = props;
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
  return (
    <button onClick={() => handleAddTask()} disabled={title === ""}>
      追加
    </button>
  );
};

export default AddTaskButton;
