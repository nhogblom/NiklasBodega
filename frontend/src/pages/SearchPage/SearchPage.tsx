import Navbar from '../../components/Navbar.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage.tsx';
import { formatDate, nightsBetween } from '../../utils/BookingUtils.ts';
import { getAllAvailableRooms } from '../../api/RoomApiService.ts';
import LoadingMessage from '../../components/LoadingMessage.tsx';
import type { RoomType } from '../../types/RoomType.ts';

const badgeStyles = {
  STANDARD: 'bg-yellow-100 text-yellow-800',
  PREMIUM: 'bg-red-100 text-red-800',
  SUITE: 'bg-purple-100 text-purple-800',
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //const { isAuthenticated } = useAuth();

  const checkInDate = searchParams.get('checkInDate') ?? '';
  const checkOutDate = searchParams.get('checkOutDate') ?? '';
  const nrOfGuests = Number(searchParams.get('nrOfGuests') ?? 1);
  const adults = Number(searchParams.get('adults') ?? 1);
  const children = Number(searchParams.get('children') ?? 0);
  const nights = nightsBetween(checkInDate, checkOutDate);

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllAvailableRooms(
          checkInDate,
          checkOutDate,
          nrOfGuests,
        );
        setRooms(data);
      } catch {
        setError('Failed to load available rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [checkInDate, checkOutDate, nrOfGuests]);

  /*const handleBookNow = (room: Room) => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { redirectTo: '/newBooking', room, checkInDate, checkOutDate },
      });
      return;
    }
    navigate('/newBooking', { state: { room, checkInDate, checkOutDate } });
  };
*/

  if (loading) return <LoadingMessage message="Searching available rooms..." />;
  if (error)
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      {/* Search summary bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700">
            <span>📅</span>
            {formatDate(checkInDate)}
          </div>
          <span className="text-stone-400 text-sm">→</span>
          <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700">
            {formatDate(checkOutDate)}
          </div>
          <div className="w-px h-5 bg-stone-200" />
          <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-700">
            {adults} {adults === 1 ? 'Adult' : 'Adults'} · {children}{' '}
            {children === 1 ? 'Child' : 'Children'}
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5 text-sm text-yellow-800">
            {nights} nights
          </div>
          <button
            onClick={() => navigate('/')}
            className="ml-auto border border-orange-900 text-orange-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition"
          >
            Edit search
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Results header */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
            Available rooms
          </p>
          <h1 className="font-serif text-4xl text-stone-800 mb-1">
            {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} available
          </h1>
          <p className="text-sm text-stone-500">
            Showing rooms available for your selected dates and guests.
          </p>
        </div>

        {/* Empty state */}
        {rooms.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-20 text-center">
            <p className="font-serif text-2xl text-stone-700 mb-2">
              No rooms available
            </p>
            <p className="text-sm text-stone-400 mb-6">
              Try different dates or fewer guests.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-orange-900 text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
            >
              Search again
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden"
              >
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <span
                    className={`inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 ${badgeStyles[room.badge]}`}
                  >
                    {room.type}
                  </span>
                  <h3 className="font-serif text-lg text-stone-800 mb-1">
                    {room.name}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">
                    {room.description}
                  </p>
                  <div className="flex gap-4 text-xs text-stone-400 mb-4">
                    <span>{room.size} m²</span>
                    <span>Up to {room.capacity} guests</span>
                    <span>WiFi</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400">
                        From
                      </p>
                      <p className="text-xl font-bold text-orange-900">
                        €{room.price}
                        <span className="text-xs font-normal text-stone-400">
                          {' '}
                          / night
                        </span>
                      </p>
                    </div>
                    <button
                      // onClick={() => handleBookNow(room)}
                      className="bg-orange-900 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
