import Navbar from '../../components/Navbar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Room } from '../../types/Room.ts';
import {
  type BookingFormData,
  bookingSchema,
} from '../../utils/ValidationUtils.ts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const NewBookingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const room = location.state?.room as Room;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { extraBed: false },
  });

  if (!room) {
    navigate('/roomspage');
    return null;
  }

  const onSubmit = async (data: BookingFormData) => {
    //TODO add on submit logic
  };

  const checkInDate = watch('checkInDate');
  const checkOutDate = watch('checkOutDate');
  const extraBed = watch('extraBed');

  const nights =
    checkInDate && checkOutDate
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOutDate).getTime() -
              new Date(checkInDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const totalPrice = nights * room.roomType.price;

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl border border-stone-200 p-7"
          >
            <h2 className="font-serif text-lg text-stone-800 mb-6">
              Your stay details
            </h2>

            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Check-in date
              </label>
              <input
                {...register('checkInDate')}
                type="date"
                className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
              />
              {errors.checkInDate && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.checkInDate.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                Check-out date
              </label>
              <input
                {...register('checkOutDate')}
                type="date"
                className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
              />
              {errors.checkOutDate && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.checkOutDate.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border border-stone-200 rounded p-3 mb-6">
              <div>
                <p className="text-sm text-stone-700">Extra bed</p>
                <p className="text-xs text-stone-400">Need an extra bed?</p>
              </div>
              <input
                {...register('extraBed')}
                type="checkbox"
                className="w-4 h-4 accent-orange-900"
              />
            </div>

            <hr className="border-stone-100 mb-4" />

            {nights > 0 && (
              <>
                <div className="flex justify-between text-sm text-stone-500 mb-2">
                  <span>
                    €{room.roomType.price} × {nights} nights
                  </span>
                  <span>€{nights * room.roomType.price}</span>
                </div>
                {extraBed && (
                  <div className="flex justify-between text-sm text-stone-500 mb-2">
                    <span>Extra bed</span>
                  </div>
                )}
                <hr className="border-stone-100 my-3" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-stone-700">
                    Total
                  </span>
                  <span className="font-serif text-2xl text-orange-900 font-bold">
                    €{totalPrice}
                  </span>
                </div>
              </>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewBookingsPage;
