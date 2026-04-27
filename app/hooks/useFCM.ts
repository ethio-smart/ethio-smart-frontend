"use client";

import { useEffect, useState } from "react";
import { onMessage, MessagePayload } from "firebase/messaging";
import { messaging } from "../lib/firebase";
import { toast } from "sonner";
import useFCMToken from "./useFCMToken";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const msg = messaging();
    if (!msg) return;

    const unsubscribe = onMessage(msg, (payload: MessagePayload) => {
      console.log("🔥 Foreground message received:", payload);

      // IMPORTANT: use DATA, not notification
      toast(payload.data?.title || "New Notification", {
        description: payload.data?.body || "",
      });

      setMessages((prev) => [...prev, payload]);
    });

    return () => unsubscribe();
  }, []);

  return { fcmToken, messages };
};

export default useFCM;