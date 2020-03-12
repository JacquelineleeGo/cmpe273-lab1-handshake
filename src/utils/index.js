export function getToken() {
    return localStorage.getItem("handSharkToken");
  }
  
  export function delToken() {
    return localStorage.removeItem("handSharkToken");
  }
  