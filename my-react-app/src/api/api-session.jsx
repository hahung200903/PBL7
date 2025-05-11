import API_BASE_URL from './baseurl';
import axios from 'axios';
import { getAccessToken } from '../utils/storage';
const API_TAIKHOAN = `${API_BASE_URL}/api`;

export const addSession = async (resumes, jd, sessionName) => {
    try {
      const formData = new FormData();
      resumes.forEach((file) => {
        formData.append('resumes', file.file); // Chú ý lấy file gốc
      });
      formData.append('jd', jd.file); // Cũng lấy file gốc
      formData.append('sessionName', sessionName);
      const response = await axios.post(`${API_TAIKHOAN}/session`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': getAccessToken(), // Gắn token ở đây
        },
      });
      console.log("Add session response:", response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Add session error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add session",
      };
    }
  };
  export const getSession = async () => {
    try {
      const response = await axios.get(`${API_TAIKHOAN}/session`, {
        headers: {
          'Authorization': getAccessToken(), // Thêm token vào header
        },
      });
  
      return {
        success: true,
        data: response.data.metadata,
      };
    } catch (error) {
      console.error("Get session error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch session data",
      };
    }
  };
  export const getSessionById = async (id) => {
    try {
      const response = await axios.get(`${API_TAIKHOAN}/session/${id}`, {
        headers: {
          'Authorization': getAccessToken(), // Gắn token nếu API cần
        },
      });
      console.log("Get session by ID response:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("Get session by ID error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch session detail",
      };
    }
  };
  