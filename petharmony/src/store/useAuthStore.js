import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  token: '',
  email: '',
  name: '',
  role: '',

  login: (token, email, name, role) => set({
    isLogin: true,
    token,
    email,
    name,
    role
  }),
  logout: () => set({
    isLogin: false,
    token: '',
    email: '',
    name: '',
    role: ''
  }),
  // [헤더] > OOO님
  setName: (newName) => set({ name: newName })
}));

export default useAuthStore;