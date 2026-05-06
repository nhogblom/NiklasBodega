import type { Booking } from '../types/Booking.ts';

export const statusStyles: Record<Booking['status'], string> = {
  CONFIRMED: 'bg-green-100 text-green-800',
  AWAITING_CONFIRMATION: 'bg-yellow-100 text-yellow-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export const statusLabels: Record<Booking['status'], string> = {
  CONFIRMED: 'Confirmed',
  AWAITING_CONFIRMATION: 'Awaiting Confirmation',
  CANCELLED: 'Cancelled',
};
