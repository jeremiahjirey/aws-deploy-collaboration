import api from "./axios";

export async function getCurrentUser() {
  try {
    const response = await api.get("/api/users");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message || "Failed to get user" };
  }
}
