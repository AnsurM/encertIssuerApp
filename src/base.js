import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBlQEWOVJHaNbJBd7suPz6JSaAL6DnjpXQ",
  authDomain: "cert-auth-df6d1.firebaseapp.com",
  databaseURL: "https://cert-auth-df6d1.firebaseio.com",
  projectId: "cert-auth-df6d1",
  storageBucket: "cert-auth-df6d1.appspot.com",
  messagingSenderId: "443240268788"
});

export default app;
