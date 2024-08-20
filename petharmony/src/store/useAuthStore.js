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
  })
}));

export default useAuthStore;