// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5bvAWBxNBCnVVUorv_A8Zj1L43CbHsGM",
    authDomain: "parkplac-poletje.firebaseapp.com",
    projectId: "parkplac-poletje",
    storageBucket: "parkplac-poletje.appspot.com",
    messagingSenderId: "1083712006280",
    appId: "1:1083712006280:web:7708b8bcbd43a95e78973d",
    measurementId: "G-2N9H7Y2BRF",
}

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// const firebaseAppAnalytics = getAnalytics(firebaseApp)

// Exports
export const db = getFirestore(firebaseApp)
export * as Interfaces from "./interfaces"
