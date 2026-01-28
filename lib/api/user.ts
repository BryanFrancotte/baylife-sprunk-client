import { User } from "../types/user";
import { apiFetch } from "./baseApi";

export async function fetchMe() {
  return apiFetch<User>("/user/@me", {
    credentials: "include"
  });
}