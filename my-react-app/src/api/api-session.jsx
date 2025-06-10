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
  const API_RANKING_URL = 'https://b664-103-90-226-249.ngrok-free.app/api/rank';

  export const getRanking = async (topResume, resumes, jd) => {
    try {
      const payload = {
        topResume,
        resumes,
        jd,
      };
  
      const response = await axios.post(API_RANKING_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAccessToken(), // Thêm token ở đây
        },
      });
  
      console.log("Ranking response:", response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Ranking error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to get ranking results",
      };
    }
  };
  export const patchSessionRankingResult = async (sessionId, rankingResult) => {
    try {
      const response = await axios.patch(
        `${API_TAIKHOAN}/session/${sessionId}`,
        { rankingResult }, // payload dưới dạng JSON
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getAccessToken(), // Gắn token
          },
        }
      );
  
      console.log("Patch session response:", response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Patch session error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update ranking result",
      };
    }
  };
  export const deleteSession = async (id) => {
    try {
      const response = await axios.delete(`${API_TAIKHOAN}/session/${id}`, {
        headers: {
          'Authorization': getAccessToken(), // Gắn token nếu API cần
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Delete session error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete session",
      };
    }
  };
  export const deleteResume = async (id) => {
    try {
      const response = await axios.delete(`${API_TAIKHOAN}/resume/${id}`, {
        headers: {
          'Authorization': getAccessToken(), // Gắn token nếu API cần
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Delete session error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete session",
      };
    }
  };
  const API_STATISTICS_URL = "https://b664-103-90-226-249.ngrok-free.app/api/statistics";

  export const getStatistics = async () => {
    try {
      const response = await axios.get("https://b664-103-90-226-249.ngrok-free.app/api/statistics", {
        headers: {
          'Authorization': getAccessToken(), // Gắn token
          'ngrok-skip-browser-warning': 'true' // Thêm header để bỏ cảnh báo của ngrok
        },
      });
  
      console.log("Statistics response:", response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Get statistics error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch statistics",
      };
    }
  };
  const API_UPDATE_VOCAB = "https://b664-103-90-226-249.ngrok-free.app/api/update-vocab";

export const updateVocab = async (resumes, category) => {
  try {
    const formData = new FormData();
    resumes.forEach((file) => {
      formData.append("resumes", file); // hoặc file.file nếu bạn wrap như lúc addSession
    });
    formData.append("category", category);

    const response = await axios.post(API_UPDATE_VOCAB, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': getAccessToken(),
        'ngrok-skip-browser-warning': 'true',
      },
    });

    console.log("Update vocab response:", response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Update vocab error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update vocab",
    };
  }
};
const API_WORDCLOUD_URL = "https://b664-103-90-226-249.ngrok-free.app/api/wordcloud";

export const getWordCloud = async (category) => {
  try {
    const response = await axios.get(`${API_WORDCLOUD_URL}?category=${encodeURIComponent(category)}`, {
      headers: {
        'Authorization': getAccessToken(),
        'ngrok-skip-browser-warning': 'true',
      },
    });

    console.log("Word cloud response:", response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Get word cloud error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch word cloud",
    };
  }
};
