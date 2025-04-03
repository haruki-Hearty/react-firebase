import { deleteDoc, doc } from "firebase/firestore";
import db from "../libs/firebase/init.ts";
//データベースから削除
const DeleteTask = async (id) => {
  try {
    await deleteDoc(doc(db, "task", id));
    console.log("Document written with ID: ", id);
  } catch (error) {
    console.error("deleteできませんでした", error);
  }
}
// const DeleteTaskButton = (props) => {
//   const {fetchData, id } = props;
//   const handleDeleteTask = async (id) => {
//     try {
//       await deleteDoc(doc(db, "task", id));
//       console.log("Document written with ID: ", id);
//       fetchData();
//     } catch (error) {
//       console.error("deleteできませんでした", error);
//     }
//   };
//   return <button onClick={() => handleDeleteTask(id)}>x</button>;
// };

export default DeleteTask;
