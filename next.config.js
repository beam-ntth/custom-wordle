/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    firebase_apiKey: process.env.firebase_apiKey,
    firebase_authDomain: process.env.firebase_authDomain,
    firebase_projectId: process.env.firebase_projectId,
    firebase_storageBucket: process.env.firebase_storageBucket,
    firebase_messagingSenderId: process.env.firebase_messagingSenderId,
    firebase_appId: process.env.firebase_appId
  }
}

module.exports = nextConfig