import API_BASE_URL from './baseurl';
import axios from 'axios';

const API_TAIKHOAN = `${API_BASE_URL}/api`;

export const loginApi = async (email, password) => {
  try {
    const { data, status } = await axios.post(`${API_TAIKHOAN}/login`, {
      email,
      password
    });

    if (status === 200 && data?.metadata?.access_token) {
      return {
        success: true,
        token: data.metadata.access_token,
        user: data.metadata.user,
        message: data.message || "Login successful"
      };
    }

    return {
      success: false,
      message: data?.message || "Incorrect username or password"
    };
  } catch (error) {
    console.error("Login API Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
    };
  }
};

  
export const signupApi = async (email, password) => {
  try {
    const { data, status } = await axios.post(`${API_TAIKHOAN}/signup`, {
      email,
      password
    });

    if (status === 200 || status === 201) {
      return {
        success: true,
        message: data?.message || "Signup successful",
      };
    }

    return {
      success: false,
      message: data?.message || "Signup failed",
    };
  } catch (error) {
    console.error("Signup API Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again.",
    };
  }
};
