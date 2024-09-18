import { create } from 'zustand';
import axiosInstance from '../api/axiosConfig';

const useAuthStore = create((set) => ({
  isLogin: false,
  token: '',
  email: '',
  name: '',
  role: '',
  userId: null,

  // 로그인
  login: (token, email, name, role, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    set({
      isLogin: true,
      token,
      email,
      name,
      role,
      userId: Number(userId)
    });
  },

  // Access Token 갱신
  updateToken: (newToken) => {
    localStorage.setItem('token', newToken);
    set({
      token: newToken
    });
  },

  // 로그아웃
  logout: async () => {
    try {
      await axiosInstance.post('/api/auth/logout', {});
    } catch (error) {
      console.error('🐶 로그아웃에 실패하였습니다.');
    } finally {
      useAuthStore.getState().forceLogout();
    }
  },
  forceLogout: () => {
    localStorage.clear();
    set({
      isLogin: false,
      token: '',
      email: '',
      name: '',
      role: '',
      userId: null
    });
  },

  // 사용자 이름 갱신
  setName: (newName) => {
    localStorage.setItem('name', newName);
    set({ name: newName });
  },
}));

export default useAuthStore;