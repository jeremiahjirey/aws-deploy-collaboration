import Cookies from "js-cookie";
import api from "./axios";

// Fungsi Login
export async function Login(email, password) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const data = response.data;
    Cookies.set("token", `${data.token}`, { expires: 7 });

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.response?.data?.errors || "Login failed" };
  }
}

export async function Logout() {
  try {
    await api.get("/api/auth/logout");
    return { success: true };
  } catch (err) {
    return { success: true, error: err.response?.message || err.message };
  } finally {
    Cookies.remove("token");
  }
}

export async function Register(name, email, password) {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 422) {
        return {
          success: false,
          status: 422,
          error: error.response.data.errors,
        };
      }

      return {
        success: false,
        status: error.response.status,
        error: error.response.data.message || "Registration failed",
      };
    }
  }
}
