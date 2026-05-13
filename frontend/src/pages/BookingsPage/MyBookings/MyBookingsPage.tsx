import { mockBookings } from '../../../utils/BookingUtils.ts';
import BookingPageMainComponent from './components/BookingPageMainComponent.tsx';

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
    <BookingPageMainComponent
      bookings={bookings}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
    />
  );
};

export default MyBookingsPage;
