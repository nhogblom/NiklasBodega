export interface BookingRequestDto {
  roomTypeId: number;
  checkInDate: string;
  checkOutDate: string;
  extraBed: boolean;
}