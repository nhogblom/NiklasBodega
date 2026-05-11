import type { Room } from '../types/Room.ts';
import Navbar from '../components/Navbar.tsx';
import { useEffect, useState } from 'react';
import { getAllRooms } from '../api/RoomApiService.ts';

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

const badgeStyles = {
  standard: 'bg-yellow-100 text-yellow-800',
  premium: 'bg-red-100 text-red-800',
  suite: 'bg-purple-100 text-purple-800',
};

const RoomCard = ({ room }: { room: Room }) => (
  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
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
      <h3 className="font-serif text-lg text-stone-800 mb-1">{room.name}</h3>
      <p className="text-sm text-stone-500 leading-relaxed mb-4">
        {room.description}
      </p>
      <div className="flex gap-4 text-xs text-stone-500 mb-4">
        <span>{room.size} m²</span>
        <span>Up to {room.capacity} guests</span>
        <span>WiFi included</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            From
          </p>
          <p className="text-xl font-bold text-orange-900">
            €{room.price}{' '}
            <span className="text-xs font-normal text-stone-400">/ night</span>
          </p>
        </div>
        <button className="bg-orange-900 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

const FeaturedRoom = ({ room }: { room: Room }) => (
  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden grid md:grid-cols-2">
    <img
      src={room.imageUrl}
      alt={room.name}
      className="w-full h-full min-h-[280px] object-cover"
    />
    <div className="p-8 flex flex-col justify-center">
      <span
        className={`inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 w-fit ${badgeStyles[room.badge]}`}
      >
        {room.type}
      </span>
      <h3 className="font-serif text-2xl text-stone-800 mb-2">{room.name}</h3>
      <p className="text-sm text-stone-500 leading-relaxed mb-6">
        {room.description}
      </p>
      <div className="flex gap-4 text-xs text-stone-500 mb-6">
        <span>{room.size} m²</span>
        <span>Up to {room.capacity} guests</span>
        <span>Private terrace</span>
        <span>WiFi included</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            From
          </p>
          <p className="text-xl font-bold text-orange-900">
            €{room.price}{' '}
            <span className="text-xs font-normal text-stone-400">/ night</span>
          </p>
        </div>
        <button className="bg-orange-900 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

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

  if (loading)
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-400 text-sm uppercase tracking-widest">
          Loading rooms...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-red-400 text-sm uppercase tracking-widest">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <header className="relative h-64 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2000"
          alt="Rooms"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-5xl mb-2">Our Rooms & Suites</h1>
          <p className="text-sm font-light opacity-85">
            Thoughtfully designed spaces for every kind of stay
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-[10px] uppercase tracking-widest text-orange-700 font-bold mb-1">
          Accommodations
        </p>
        <h2 className="font-serif text-3xl text-stone-800 mb-1">
          Find your perfect room
        </h2>
        <p className="text-sm text-stone-500 mb-10">
          All rooms include breakfast, WiFi, and access to our pool and spa.
        </p>

        <div className="flex flex-col gap-6">
          {featuredRoom && <FeaturedRoom room={featuredRoom} />}
          <div className="grid md:grid-cols-3 gap-6">
            {regularRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomsPage;
