import { collection, getDocs, } from "firebase/firestore";
import db from "../libs/firebase/init.ts";

export const fetchTask = async () => {
  const querySnapshot = await getDocs(collection(db, "task"));
  const todoLists = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return todoLists;
};
