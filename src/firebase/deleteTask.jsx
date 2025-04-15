import { deleteDoc, doc } from "firebase/firestore";
import db from "../libs/firebase/init.ts";
//データベースから削除
export const deleteTask = async (collectionName,id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document written with ID: ", id);
  } catch (error) {
    console.error("deleteできませんでした", error);
  }
}
