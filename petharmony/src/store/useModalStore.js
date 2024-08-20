import { create } from 'zustand';

const useModalStore = create((set) => ({
  activeModal: null,            // 'login', 'join', 'findAccount'
  findAccountMode: null,        // 'id' || 'password'
  openLoginModal: () => set({ activeModal: 'login' }),
  openJoinModal: () => set({ activeModal: 'join' }),
  openFindAccountModal: (mode) => set({ activeModal: 'findAccount', findAccountMode: mode }),
  closeModal: () => set({ activeModal: null, findAccountMode: null }),
}));

export default useModalStore;