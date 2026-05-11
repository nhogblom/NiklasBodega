import Navbar from '../../../components/Navbar.tsx';
import RoomCard from './RoomCard.tsx';
import featuredRoom from './FeaturedRoom.tsx';
import FeaturedRoom from './FeaturedRoom.tsx';

const RoomsPageMainComponent = () => {
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
export default RoomsPageMainComponent;
