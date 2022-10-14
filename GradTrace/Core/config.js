import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdA4lJBPIYDwe5pfaTimnitIIsj0UAGL8",
  authDomain: "gradtrace-tugas.firebaseapp.com",
  projectId: "gradtrace-tugas",
  storageBucket: "gradtrace-tugas.appspot.com",
  messagingSenderId: "85828167127",
  appId: "1:85828167127:web:d0109fc15cf65ac3c9d792"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);

export const storage = getStorage(app)
