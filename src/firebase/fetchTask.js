import { collection, getDocs, } from "firebase/firestore";
import db from "../libs/firebase/init.ts";

export const fetchTask = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const dataList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return dataList;
};
