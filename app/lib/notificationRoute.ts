import type { Notification, Role } from "@/app/types/types";

const withLocale = (locale: string, path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
};

const buildQuery = (notification: Notification) => {
  const params = new URLSearchParams();
  const bookingId = notification.data?.bookingId;
  const disputeId = notification.data?.disputeId;
  const requestId = notification.data?.requestId ?? notification.data?.serviceRequestId;
  const serviceRequestId = notification.data?.serviceRequestId;

  if (bookingId) params.set("bookingId", bookingId);
  if (disputeId) params.set("disputeId", disputeId);
  if (requestId) params.set("requestId", requestId);
  if (serviceRequestId) params.set("serviceRequestId", serviceRequestId);

  const query = params.toString();
  return query ? `?${query}` : "";
};

const resolvePathByEntity = (entityType: string, role?: Role) => {
  const normalizedRole = role ?? "USER";

  if (entityType === "SERVICE_REQUEST") {
    if (normalizedRole === "TASKER") return "/tasker/request";
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/pending-taskers";
    }
    return "/client/requests";
  }

  if (entityType === "BOOKING") {
    if (normalizedRole === "TASKER") return "/tasker/bookings";
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/booking-management";
    }
    return "/client/bookings";
  }

  if (entityType === "DISPUTE") {
    if (normalizedRole === "TASKER") return "/tasker/disputes";
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/disputes";
    }
    return "/client/disputes";
  }

  if (entityType === "PAYMENT") {
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/payments";
    }
    return "/client/payments";
  }

  return null;
};

const resolveBasePathByType = (type: string, role?: Role) => {
  const normalizedRole = role ?? "USER";

  if (type === "SERVICE_REQUEST" || type === "TASKER_REQUEST") {
    if (normalizedRole === "TASKER") return "/tasker/request";
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/pending-taskers";
    }
    return "/client/requests";
  }

  if (type === "BOOKING_UPDATE") {
    if (normalizedRole === "TASKER") return "/tasker/bookings";
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/booking-management";
    }
    return "/client/bookings";
  }

  if (type === "DISPUTE_UPDATE") {
    if (normalizedRole === "TASKER") return "/tasker/disputes";
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/disputes";
    }
    return "/client/disputes";
  }

  if (type === "PAYMENT_UPDATE" || type === "REFUND_UPDATE") {
    if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
      return "/admin/payments";
    }
    return "/client/payments";
  }

  if (normalizedRole === "TASKER") return "/tasker/dashboard";
  if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "SYSTEM_ADMIN") {
    return "/admin/dashboard";
  }
  return "/client/dashboard";
};

export const getNotificationHref = (
  notification: Notification,
  locale: string,
  role?: Role,
) => {
  const directPath =
    notification.data?.path ?? notification.data?.url ?? notification.data?.href;

  if (directPath) {
    if (directPath.startsWith("http://") || directPath.startsWith("https://")) {
      return directPath;
    }

    if (directPath.startsWith(`/${locale}/`)) return directPath;
    return withLocale(locale, directPath);
  }

  const entityType = String(notification.entityType ?? "").trim().toUpperCase();
  const entityPath = resolvePathByEntity(entityType, role);
  if (entityPath) {
    const entityId = notification.entityId;
    const params = new URLSearchParams(buildQuery(notification).replace(/^\?/, ""));

    if (entityType === "BOOKING" && entityId && !params.has("bookingId")) {
      params.set("bookingId", entityId);
    }
    if (entityType === "SERVICE_REQUEST" && entityId && !params.has("serviceRequestId")) {
      params.set("serviceRequestId", entityId);
      if (!params.has("requestId")) {
        params.set("requestId", entityId);
      }
    }
    if (entityType === "DISPUTE" && entityId && !params.has("disputeId")) {
      params.set("disputeId", entityId);
    }

    const query = params.toString();
    return withLocale(locale, `${entityPath}${query ? `?${query}` : ""}`);
  }

  const normalizedType = String(notification.type ?? "").trim().toUpperCase();
  const basePath = resolveBasePathByType(normalizedType, role);
  const query = buildQuery(notification);
  return withLocale(locale, `${basePath}${query}`);
};
