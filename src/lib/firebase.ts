import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore/lite';
import { Task } from './interfaces';
import { FirestoreDataConverter } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

console.log('firebaseConfig:', firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

const taskCollectionReference = collection(db, 'tasks');

export const createTaskDocument = async (task: Task) => {
  const docRef = await addDoc(taskCollectionReference, task);
  console.log('Document written with ID: ', docRef.id);
};

export const getTaskCollection = () => {
  const q = query(taskCollectionReference).withConverter(taskConverter);
  return getDocs(q);
};

export const deleteTaskDocument = async (id: string) => {
  const taskDocument = doc(taskCollectionReference, id);
  await deleteDoc(taskDocument);
};

export const updateTaskDocument = async (task: Task) => {};

const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(task: Task) {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      meta: task.meta,
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      status: data.status,
      meta: data.meta ?? {},
    };
  },
};

// export const taskListReference = collection(db, 'tasks').withConverter<Task>(taskConverter);
