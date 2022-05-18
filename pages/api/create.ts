import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig, "write-commands");
const db = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (req.method == "POST" && req.headers['content-type'] == "application/json") {
        const data = req.body
        const game_id = uuidv4().toString()
        await setDoc(doc(db, collectionKey, game_id), data);
        res.status(200).json(`https://custom-wordle-lime.vercel.app/?key=${game_id}`)
    }
    res.status(400).json("Wrong method or incorrect Content-Type")
}