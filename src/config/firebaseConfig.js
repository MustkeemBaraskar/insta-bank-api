const { initializeApp } = require('@firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('@firebase/auth');


const firebaseConfig = {
  apiKey: "AIzaSyAb4XedWTkRzw3kZPnzp9Y6mFGzoaYckxI",
  authDomain: "insta-bank.firebaseapp.com",
  projectId: "insta-bank",
  storageBucket: "insta-bank.appspot.com",
  messagingSenderId: "677996773923",
  appId: "1:677996773923:web:34755c0bd275c021cba796",
  measurementId: "G-BJ5VQXBXTL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
