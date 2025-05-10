import API_BASE_URL from './baseurl';
import axios from 'axios';

const API_TAIKHOAN = `${API_BASE_URL}/api/taikhoan`;

export const loginApi = async (tenDangNhap, matKhau) => {
    try {
      const response = await axios.post(`${API_TAIKHOAN}/login`, {
          tenDangNhap,
          matKhau
      });
  
      if (response.status === 200 && response.data?.token) {
        return {
          success: true,
          token: response.data.token,
          message: "Login successful"
        };
      } else {
        return {
          success: false,
          message: response.data?.message || "Incorrect username or password"
        };
      }
    } catch (error) {
      console.error("Error message: ", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Incorrect username or password"
      };
    }
  };
  
