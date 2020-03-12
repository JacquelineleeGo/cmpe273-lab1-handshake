export function getToken() {
    return localStorage.getItem("handShakeToken");
}
  
export function delToken() {
    return localStorage.removeItem("handShakeToken");
}
