import { getToken, isSupported } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging } from "../lib/firebase";
import useNotificationPermissionStatus from "./useNotificationPermissionStatus";

const useFCMToken = () => {
  const permission = useNotificationPermissionStatus();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        // Check if we're in browser environment
        if (typeof window === "undefined") return;

        // Check if service worker is supported
        if (!("serviceWorker" in navigator)) {
          console.warn(" Service Worker not supported");
          return;
        }

        // Check if FCM is supported
        const isFCMSupported = await isSupported();
        console.log('is fcm supported',isFCMSupported)
        if (!isFCMSupported) {
          console.warn(" FCM not supported in this browser");
          return;
        }

        // Check permission
        if (permission !== "granted") {
          console.warn(" Notification permission not granted");
          return;
        }

        console.log(" Getting FCM token...");
        
        // Get token with proper error handling
        const currentToken = await getToken(messaging(), {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
          serviceWorkerRegistration:await navigator.serviceWorker.register(
            '/firebase-messaging-sw.js'
          )
        });

        if (!currentToken) {
          console.warn(" No FCM token received");
          return;
        }

        console.log("Current FCM TOKEN:", currentToken);
        setFcmToken(currentToken);
        
        // Store token in localStorage for persistence
        // localStorage.setItem("fcmToken", currentToken);
        
      } catch (err) {
        console.error("💥 FCM TOKEN ERROR:", err);
      }
    };

    retrieveToken();
  }, [permission]);

  return fcmToken;
};

export default useFCMToken