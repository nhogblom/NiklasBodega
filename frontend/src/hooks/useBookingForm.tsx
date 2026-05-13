import { useForm } from 'react-hook-form';
import {
  type BookingFormData,
  bookingSchema,
} from '../utils/ValidationUtils.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export const useBookingForm = () => {
  return useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { extraBed: false },
  });
}