import BookingPageMainComponent from './components/BookingPageMainComponent.tsx';
import { useEffect, useState } from 'react';
import {
  deleteBooking,
  getAllBookings,
} from '../../../api/BookingApiService.ts';
import type { Booking } from '../../../types/Booking.ts';
import LoadingMessage from '../../../components/LoadingMessage.tsx';
import ErrorMessage from '../../../components/ErrorMessage.tsx';
import CancelBookingConfirmationModal from './components/CancelBookingConfirmationModal.tsx';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chosenBookingNumber, setChosenBookingNumber] = useState<string | null>(
    null,
  );

  const handleEdit = (bookingNumber: string) => {
    // TODO: navigate to edit booking page
    console.log('Edit booking', bookingNumber);
  };

  const handleCancel = (bookingNumber: string) => {
    setChosenBookingNumber(bookingNumber);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const myBookings = await getAllBookings();
        setBookings(myBookings);
      } catch {
        setError('Failed loading bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <LoadingMessage message={'Loading bookings...'} />;

  if (error) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }
  return (
    <>
      {chosenBookingNumber && (
        <CancelBookingConfirmationModal
          bookingNumber={chosenBookingNumber}
          onConfirm={async () => {
            try {
              await deleteBooking(chosenBookingNumber);
            } catch {
              setError('Failed to delete booking.');
              setChosenBookingNumber(null);
              return;
            }
            try {
              const myBookings = await getAllBookings();
              setBookings(myBookings);
            } catch {
              setError('Failed to fetch bookings.');
            } finally {
              setChosenBookingNumber(null);
              setLoading(false);
            }
          }}
          onCancel={() => setChosenBookingNumber(null)}
        />
      )}

      <BookingPageMainComponent
        bookings={bookings}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default MyBookingsPage;
