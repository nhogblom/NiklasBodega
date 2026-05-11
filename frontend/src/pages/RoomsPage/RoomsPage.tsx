import type { Room } from '../../types/Room.ts';
import { useEffect, useState } from 'react';
import { getAllRooms } from '../../api/RoomApiService.ts';
import LoadingMessage from '../../components/LoadingMessage.tsx';
import ErrorMessage from '../../components/ErrorMessage.tsx';
import RoomsPageMainComponent from './components/RoomsPageMainComponent.tsx';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms = await getAllRooms();
        console.log(allRooms);
        setRooms(allRooms);
      } catch {
        setError('Failed loading rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <LoadingMessage message={'Loading rooms...'} />;

  if (error) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }
  return <RoomsPageMainComponent rooms={rooms} />;
};
export default RoomsPage;
