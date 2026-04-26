

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");


firebase.initializeApp({
  apiKey: "AIzaSyAUCeleqDX8a2V8hgc9ruulmsHK1fRRuEI",
  authDomain: "ethio-smart.firebaseapp.com",
  projectId: "ethio-smart",
  storageBucket: "ethio-smart.firebasestorage.app",
  messagingSenderId: "789608454383",
  appId: "1:789608454383:web:7f84fad609d556a4fe231a",
  measurementId: "G-89MZWWK221"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message:", payload);

  const title = payload?.data?.title || "New Notification";

  const options = {
    body: payload?.data?.body || "",
    icon: "/icon.png",
    data: payload?.data || {},
  };

  self.registration.showNotification(title, options);
});