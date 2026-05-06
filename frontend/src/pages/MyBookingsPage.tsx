import Navbar from '../components/Navbar.tsx';
import type { Booking } from '../types/Booking.ts';
import {
  statusStyles,
  statusLabels,
  formatDate,
  nightsBetween,
  mockBookings,
} from '../utils/BookingUtils.ts';

const BookingCard = ({
  booking,
  onEdit,
  onCancel,
}: {
  booking: Booking;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
}) => {
  const isCancelled = booking.status === 'CANCELLED';
  const nights = nightsBetween(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 flex gap-5 items-start">
      <img
        src={booking.roomImageUrl}
        alt={booking.roomName}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg text-stone-800 mb-3">
          {booking.roomName}
        </h3>

        <div className="flex gap-6 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Check-in
            </p>
            <p className="text-sm font-medium text-stone-700">
              {formatDate(booking.checkInDate)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Check-out
            </p>
            <p className="text-sm font-medium text-stone-700">
              {formatDate(booking.checkOutDate)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">
              Duration
            </p>
            <p className="text-sm font-medium text-stone-700">
              {nights} nights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${statusStyles[booking.status]}`}
          >
            {statusLabels[booking.status]}
          </span>
          {booking.extraBed && (
            <span className="text-xs text-stone-400">Extra bed included</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(booking.id)}
          disabled={isCancelled}
          className="border border-orange-900 text-orange-900 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Edit
        </button>
        <button
          onClick={() => onCancel(booking.id)}
          disabled={isCancelled}
          className="border border-red-700 text-red-700 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const MyBookingsPage = () => {
  const bookings = mockBookings;

  const handleEdit = (id: number) => {
    // TODO: navigate to edit booking page
    console.log('Edit booking', id);
  };

  const handleCancel = (id: number) => {
    // TODO: call cancelBooking API then refresh list
    console.log('Cancel booking', id);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
              Account
            </p>
            <h1 className="font-serif text-4xl text-stone-800">My Bookings</h1>
          </div>
          <button className="bg-orange-900 text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition">
            + New Booking
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-16 text-center">
            <p className="font-serif text-xl text-stone-700 mb-2">
              No bookings yet
            </p>
            <p className="text-sm text-stone-400">
              Your reservations will appear here once you make a booking.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onEdit={handleEdit}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
