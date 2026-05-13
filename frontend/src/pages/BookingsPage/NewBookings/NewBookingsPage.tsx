import Navbar from '../../../components/Navbar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Room } from '../../../types/Room.ts';
import { type BookingFormData } from '../../../utils/ValidationUtils.ts';
import { useState } from 'react';
import NewBookingForm from './components/NewBookingForm.tsx';

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
    //TODO add on submit logic
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
          {/* Room summary */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <img
              src={room.roomType.imageUrl}
              alt={room.roomType.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 bg-purple-100 text-purple-800">
                {room.roomType.type}
              </span>
              <h3 className="font-serif text-xl text-stone-800 mb-2">
                {room.roomType.name}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">
                {room.roomType.description}
              </p>
              <div className="flex gap-4 text-xs text-stone-400 pt-4 border-t border-stone-100">
                <span>{room.roomType.size} m²</span>
                <span>Up to {room.roomType.capacity} guests</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                  Price per night
                </span>
                <span className="font-serif text-xl text-orange-900 font-bold">
                  €{room.roomType.price}
                </span>
              </div>
            </div>
          </div>

          {/* Booking form */}
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
