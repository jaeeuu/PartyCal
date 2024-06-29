import { getCookie } from "vinxi/http";
import store from "./store";

export async function GET(event) {
  const userId = getCookie("userId");
  if (!userId) {
    return new Response("Not logged in", { status: 401 });
  }
  const user = await store.getUser(event.params.userId);
  if (user.id !== userId) {
    return new Response("Not authorized", { status: 403 });
  }
  return user;
}