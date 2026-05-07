//TODO calls regarding rooms

import axiosInstance from './AxiosConfig.ts';

export const getAllRooms = async () => {
  try {
    const response = await axiosInstance.get('/api/rooms');
    return response.data;
  } catch (error) {
    console.error('Error getting all rooms', error);
    throw error;
  }
};

export const getAllAvailableRooms = async () => {
  try {
    const response = await axiosInstance.get('/api/rooms/available');
    return response.data;
  } catch (error) {
    console.error('Error getting available rooms', error);
    throw error;
  }
};
