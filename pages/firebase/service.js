import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";
import { app } from "./init";

const firestore = getFirestore(app);

export async function retriveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName, id) {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  const data = snapshot.data();
  return data;
}
