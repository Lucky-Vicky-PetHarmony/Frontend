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
  logout: () => {
    // localStorage 초기화
    localStorage.clear();
    // 상태 초기화
    set({
      isLogin: false,
      token: '',
      email: '',
      name: '',
      role: '',
      userId: null
    });
  },
  // [헤더] > OOO님
  setName: (newName) => set(() => {
    localStorage.setItem('name', newName);
    return { name: newName };
}),
}));

export default useAuthStore;