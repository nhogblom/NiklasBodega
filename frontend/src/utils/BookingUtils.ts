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

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const nightsBetween = (checkIn: string, checkOut: string) => {
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
};

// TODO remove when fetching from backend works
export const mockBookings: Booking[] = [
  {
    id: 1,
    roomName: 'Bodega Luxury Suite',
    roomImageUrl:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400',
    checkInDate: '2026-10-12',
    checkOutDate: '2026-10-19',
    extraBed: true,
    status: 'CONFIRMED',
  },
  {
    id: 2,
    roomName: 'Classic Double',
    roomImageUrl:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=400',
    checkInDate: '2026-12-24',
    checkOutDate: '2026-12-27',
    extraBed: false,
    status: 'AWAITING_CONFIRMATION',
  },
  {
    id: 3,
    roomName: 'Classic Single',
    roomImageUrl:
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&q=80&w=400',
    checkInDate: '2026-08-01',
    checkOutDate: '2026-08-05',
    extraBed: false,
    status: 'CANCELLED',
  },
];
