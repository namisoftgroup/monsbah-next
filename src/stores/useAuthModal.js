import { create } from "zustand";

export const useAuthModal = create((set) => ({
  isOpen: false,
  formType: "reset",
  userType: "client",

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setFormType: (formType) => set({ formType }),
  setUserType: (userType) => set({ userType }),
}));
