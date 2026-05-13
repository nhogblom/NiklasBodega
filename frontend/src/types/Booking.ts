export interface Booking {
  bookingNumber: number;
  roomName: string;
  roomImageUrl: string;
  checkInDate: string;
  checkOutDate: string;
  extraBed: boolean;
  status: 'CONFIRMED' | 'AWAITING_CONFIRMATION' | 'CANCELLED';
}
