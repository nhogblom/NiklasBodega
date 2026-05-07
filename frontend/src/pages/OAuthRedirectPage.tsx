import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import axiosInstance from '../api/AxiosConfig.ts';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    axiosInstance
      .get('/api/auth/me')
      .then((response) => {
        login(response.data.username);
        navigate('/');
      })
      .catch(() => navigate('/login'));
  }, [login, navigate]);
  return null;
};
export default OAuthRedirectPage;
