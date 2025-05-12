// utils/auth.js
export const loginUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
  window.dispatchEvent(new Event("authChange"));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  window.dispatchEvent(new Event("authChange"));
};

export const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};