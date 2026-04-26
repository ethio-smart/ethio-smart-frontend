
import { useEffect, useState } from "react";

const useNotificationPermissionStatus = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updatePermission = () => {
      setPermission(Notification.permission);
    };

    updatePermission();

    Notification.requestPermission().then(updatePermission);

    navigator.permissions
      ?.query({ name: "notifications" as PermissionName })
      .then((status) => {
        status.onchange = updatePermission;
      });
  }, []);

  return permission;
};

export default useNotificationPermissionStatus;