export const LOCAL_STORAGE_TOKEN_NAME = "chat-app";

export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "https://ndth4ng-chatapp.herokuapp.com/api"
    : "https://ndth4ng-chatapp.herokuapp.com/api";
