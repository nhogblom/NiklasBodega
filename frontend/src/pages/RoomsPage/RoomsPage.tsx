import type { Room } from '../../types/Room.ts';
import { useEffect, useState } from 'react';
import { getAllRooms } from '../../api/RoomApiService.ts';
import LoadingMessage from '../../components/LoadingMessage.tsx';
import ErrorMessage from '../../components/ErrorMessage.tsx';
import RoomsPageMainComponent from './components/RoomsPageMainComponent.tsx';

const rooms: Room[] = [
  {
    id: 1,
    name: 'The Bodega Luxury Suite',
    type: 'Lux Suite',
    description:
      'Our crown jewel. A sprawling suite with panoramic Mediterranean views, a private terrace, and bespoke handcrafted furnishings.',
    price: 480,
    size: 85,
    capacity: 2,
    badge: 'suite',
    featured: true,
    imageUrl:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    name: 'Classic Single',
    type: 'Single Room',
    description:
      'A cozy, thoughtfully appointed room for solo travellers. Warm stone walls, soft linens, and everything you need for a restful stay.',
    price: 95,
    size: 22,
    capacity: 1,
    badge: 'standard',
    imageUrl:
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Classic Double',
    type: 'Double Room',
    description:
      'Perfect for couples. A generous room with a king-size bed, ensuite bathroom, and warm Mediterranean light flooding through large windows.',
    price: 150,
    size: 35,
    capacity: 2,
    badge: 'standard',
    imageUrl:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    name: 'Family Suite',
    type: 'Family Suite',
    description:
      'Spacious and welcoming, with two bedrooms and a shared living area. Designed for families who refuse to compromise on comfort.',
    price: 280,
    size: 60,
    capacity: 4,
    badge: 'premium',
    imageUrl:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
  },
];

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms = await getAllRooms();
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
