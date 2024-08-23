import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  token: '',
  email: '',
  name: '',
  role: '',
  userId: null,

  login: (token, email, name, role, userId) => set({
    isLogin: true,
    token,
    email,
    name,
    role,
    userId: Number(userId) // 상태에서는 숫자로 저장
  }),
  logout: () => set({
    isLogin: false,
    token: '',
    email: '',
    name: '',
    role: '',
    userId: null
  }),
  // [헤더] > OOO님
  setName: (newName) => set({ name: newName })
}));

export default useAuthStore;