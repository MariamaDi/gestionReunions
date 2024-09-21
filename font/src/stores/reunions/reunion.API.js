import { api } from "src/boot/axios";

export async function getReunions() {
  try {
    const reunions=await api.get("/reunions");
    return reunions.data;
  } catch (error) {
    throw new Error(error);
  }
}
