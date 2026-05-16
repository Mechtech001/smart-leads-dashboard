import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, token, setAuth, logout } = useAuthStore();
  
  return {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
    isSales: user?.role === 'sales',
    setAuth,
    logout,
  };
};
