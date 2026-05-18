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

export const getAllAvailableRooms = async (
  checkInDate: string,
  checkOutDate: string,
  totalGuests: number,
) => {
  try {
    const response = await axiosInstance.get('/api/rooms/roomTypes/available', {
      params: { checkInDate, checkOutDate, totalGuests },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting available rooms', error);
    throw error;
  }
};
