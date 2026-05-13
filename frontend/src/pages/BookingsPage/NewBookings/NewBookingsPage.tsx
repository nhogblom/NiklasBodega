import Navbar from '../../../components/Navbar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Room } from '../../../types/Room.ts';
import { type BookingFormData } from '../../../utils/ValidationUtils.ts';
import { useState } from 'react';
import NewBookingForm from './components/NewBookingForm.tsx';
import BookingRoomCard from './components/BookingRoomCard.tsx';
import { createBooking } from '../../../api/BookingApiService.ts';

const NewBookingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const room = location.state?.room as Room;

  if (!room) {
    navigate('/roomspage');
    return null;
  }

  const onSubmit = async (data: BookingFormData) => {
    setError(null);
    setLoading(true);
    try {
      await createBooking({
        roomTypeId: room.roomType.id,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        extraBed: data.extraBed,
      });
      //TODO add modal popup with success -> redirect to MyBookings.
    } catch {
      setError('Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate('/roomspage')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-600 transition mb-8"
        >
          ← Back to rooms
        </button>

        <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
          New Reservation
        </p>
        <h1 className="font-serif text-4xl text-stone-800 mb-1">
          Complete your booking
        </h1>
        <p className="text-sm text-stone-500 mb-10">
          Review your room and fill in your stay details below.
        </p>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <BookingRoomCard room={room} />
          <NewBookingForm
            room={room}
            onSubmit={onSubmit}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};
export default NewBookingsPage;
