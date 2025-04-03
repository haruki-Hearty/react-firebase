import { addDoc, collection } from "firebase/firestore";
import db from "../libs/firebase/init.ts";

/**
 * タスクを追加する処理だけにする
 * ロジック(処理)とUI(見た目)の分離
 * firebaseのロジックを分ける
 */
const AddTask = async (title) => {
  try {
    //docRefはDocument Reference（ドキュメント参照）
    const docRef = await addDoc(collection(db, "task"), {
      title,
      createdAt: new Date(), // 現在時刻を追加
    });
    console.log("Document written with ID: ", docRef.id, title);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export default AddTask;
