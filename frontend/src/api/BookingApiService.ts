import axiosInstance from './AxiosConfig.ts';
import type { Booking } from '../types/Booking.ts';
import type { BookingRequestDto } from '../pages/BookingsPage/NewBookings/dto/BookingRequestDto.ts';

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get('/api/bookings/my');
    return response.data;
  } catch (error) {
    console.error('Error getting all user bookings', error);
    throw error;
  }
};

export const createBooking = async (newBooking: BookingRequestDto) => {
  try {
    const response = await axiosInstance.post('/api/bookings', newBooking);
    return response.data;
  } catch (error) {
    console.error('Error creating new booking', error);
    throw error;
  }
};

export const deleteBooking = async (booking: Booking) => {
  try {
    const response = await axiosInstance.delete(`/api/bookings/${booking.id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking', error);
    throw error;
  }
};
