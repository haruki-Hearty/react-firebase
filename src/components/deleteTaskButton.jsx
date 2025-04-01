import { deleteDoc, doc } from "firebase/firestore";
import db from "../";
//データベースから削除
const DeleteTaskButton = (props) => {
  const {fetchData, id } = props;
  console.log(props)
  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "task", id));
      console.log("Document written with ID: ", id);
      fetchData();
    } catch (error) {
      console.error("deleteできませんでした", error);
    }
  };
  return <button onClick={() => handleDeleteTask(id)}>x</button>;
};

export default DeleteTaskButton;
