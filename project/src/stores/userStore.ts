import { create } from 'zustand';

interface User {
  email: string;
  password: string; // For demo purposes only, do NOT store plaintext passwords in production
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (userName: string, password: string) => boolean;
  logout: () => void;
}

// Demo: Only this user can log in
const defaultUser: User = {
  email: 'admin@mail.com',
  password: '123456',
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email, password) => {
    if (email === defaultUser.email && password === defaultUser.password) {
      set({ user: defaultUser, isAuthenticated: true });
      return true;
    } else {
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useUserStore;
export type { User };
