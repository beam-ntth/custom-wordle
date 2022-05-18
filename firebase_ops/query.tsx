// Import the functions you need from the SDKs you need
import { v4 as uuidv4 } from 'uuid'
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, doc, setDoc, Firestore } from "firebase/firestore";

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: publicRuntimeConfig.firebase_apiKey,
    authDomain: publicRuntimeConfig.firebase_authDomain,
    projectId: publicRuntimeConfig.firebase_projectId,
    storageBucket: publicRuntimeConfig.firebase_storageBucket,
    messagingSenderId: publicRuntimeConfig.firebase_messagingSenderId,
    appId: publicRuntimeConfig.firebase_appId
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