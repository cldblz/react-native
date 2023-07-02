// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNncNvwrqYaHyxSGCW1ZNX8830XjNK3y4",
  authDomain: "awesomeproject-f1f47.firebaseapp.com",
  databaseURL: "https://awesomeproject-f1f47-default-rtdb.firebaseio.com",
  projectId: "awesomeproject-f1f47",
  storageBucket: "awesomeproject-f1f47.appspot.com",
  messagingSenderId: "311895345974",
  appId: "1:311895345974:web:1da879bc888fe759368197",
  measurementId: "G-R9KY9ZKZEQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export default initializeApp(firebaseConfig);
