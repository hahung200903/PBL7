import { jwtDecode } from "jwt-decode"

export const getAccessToken = () => {
  const token = sessionStorage.getItem('accessToken')
  return token ? `Bearer ${token}` : ''
}
export const saveAccessToken = (token) => {
  sessionStorage.setItem('accessToken', token)
}
export const tokenBear = (token) => {
  return 'Bearer ' + token
}

export const getFullname = () => {
  const result = sessionStorage.getItem('accessToken').toString();
  const decodedToken = jwtDecode(result);
  const fullname = decodedToken.fullname;
  return fullname;
}
