import axiosInstance from './AxiosConfig.ts';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const registerUser = async (
  username: string,
  fullname: string,
  password: string,
) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', {
      username,
      fullname,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.get('/api/auth/logout');
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};
