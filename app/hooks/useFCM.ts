// import { useEffect, useState } from "react"
// import {MessagePayload, onMessage} from 'firebase/messaging'
// import { messaging } from "../lib/firebase"
// import { toast } from "sonner"
// import useFCMToken from "./useFCMToken"

// const useFCM=()=>{
//     const fcmToken=useFCMToken()
//     const[messages,setMessages]=useState<MessagePayload[]>([])
//     console.log('fcmtoken from usefcm hook',fcmToken)
//     console.log('message',messages)
//     useEffect(()=>{
//         if('serviceWorker' in navigator){
//             const fcmessaging=messaging()
//             const unsubscribe=onMessage(fcmessaging,(payload)=>{
//                 toast(payload.notification?.title,{
//                     description:payload.notification?.body
//                 })
//                 toast('hello',{
//                     description:'service request'
//                 })
//                 setMessages((messages)=> [...messages,payload])

//             })
//             return () => unsubscribe()
            
//         }
//     },[fcmToken]);
//     return {fcmToken,messages}
// }

// export default useFCM


import { useEffect, useState } from "react";
import { onMessage, MessagePayload } from "firebase/messaging";
import { messaging } from "../lib/firebase";
import { toast } from "sonner";
import useFCMToken from "./useFCMToken";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  console.log('meassage',messages)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const msg = messaging();

    const unsubscribe = onMessage(msg, (payload) => {
      console.log(" Foreground message received:", payload);
      // Extract title and body from different possible locations
      let title = "New Notification";
      console.log('title',title)
      let body = "";

      if (payload.data) {
        title = payload.data.title || title;
        body = payload.data.body || body;
      }
      
      if (payload.notification) {
        title = payload.notification.title || title;
        body = payload.notification.body || body;
      }

      console.log("Extracted notification:", { title, body });

      // Show toast notification
      toast(title, {
        description: body,
      });

      setMessages((prev) => [...prev, payload]);
    });

    return () => unsubscribe();
  }, [fcmToken]);

  return { fcmToken, messages };
};

export default useFCM;