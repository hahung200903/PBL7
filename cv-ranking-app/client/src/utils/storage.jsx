export const getAccessToken = () => {
  const token = sessionStorage.getItem('accessToken');
  return token ? tokenBear(token) : '';
};

export const saveAccessToken = (token) => {
  const cleanedToken = token
    .replace(/\n/g, ' ')            // Xóa xuống dòng và thay bằng khoảng trắng
    .trim()                         // Xóa khoảng trắng đầu/cuối
    .replace(/^Bearer\s+/i, '');    // Xóa "Bearer " nếu có
  sessionStorage.setItem('accessToken', cleanedToken);
};


export const tokenBear = (token) => {
  return 'Bearer ' + token
}
export const clearAccessToken = () => {
  sessionStorage.removeItem('accessToken');
};
