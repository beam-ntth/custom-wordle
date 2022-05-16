// Import the functions you need from the SDKs you need
import { v4 as uuidv4 } from 'uuid'
import getConfig from 'next/config'
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, doc, setDoc, Firestore } from "firebase/firestore";

const { serverRuntimeConfig } = getConfig()

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: serverRuntimeConfig.firebase_apiKey,
    authDomain: serverRuntimeConfig.firebase_authDomain,
    projectId: serverRuntimeConfig.firebase_projectId,
    storageBucket: serverRuntimeConfig.firebase_storageBucket,
    messagingSenderId: serverRuntimeConfig.firebase_messagingSenderId,
    appId: serverRuntimeConfig.firebase_appId
}
const collectionKey = "d05e6c0b-315a-4abb-8a0e-1bece1353255"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// "9caf89a3-3923-4dbe-8240-83013619d451"

export const getWordleData = async (documentKey: string) => {
    console.log(db)
    if (db === null) {
        return
    }
    const docRef = doc(db, collectionKey, documentKey);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    }
    console.log("No such document!");
    return null
}

export const createNewGame = async (data: any) => {
    if (db === null) {
        return ``
    }
    const game_id = uuidv4().toString()
    await setDoc(doc(db, collectionKey, game_id), data);
    return `https://custom-wordle-lime.vercel.app/?key=${game_id}`
}