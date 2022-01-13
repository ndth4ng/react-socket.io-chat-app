export const LOCAL_STORAGE_TOKEN_NAME = "chat-app";

export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https:https://ndth4ng-chatapp.herokuapp.com/api";
