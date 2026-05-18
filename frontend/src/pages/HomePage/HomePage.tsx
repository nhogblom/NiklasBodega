import Navbar from '../../components/Navbar.tsx';
import HomePageHero from './components/HomePageHero.tsx';

const RoomCard = ({
  title,
  price,
  image,
}: {
  title: string;
  price: number;
  image: string;
}) => (
  <div className="group cursor-pointer">
    <div className="overflow-hidden rounded-xl mb-4">
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
      />
    </div>
    <h3 className="text-2xl font-serif text-stone-900">{title}</h3>
    <p className="text-orange-800 font-medium mt-1">From ${price} / night</p>
  </div>
);

const Homepage: React.FC = () => {
  const rooms = [
    {
      title: 'The Garden Suite',
      price: 320,
      image:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'The Bodega Loft',
      price: 450,
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Signature Terrace',
      price: 680,
      image:
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <HomePageHero />

      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-orange-700 font-bold tracking-[0.2em] text-xs uppercase">
              The Sanctuary
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">
              Curated Guest Suites
            </h2>
          </div>
          <button className="mt-6 md:mt-0 text-stone-500 border-b border-stone-300 pb-1 hover:text-orange-900 hover:border-orange-900 transition">
            Explore All Rooms
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} {...room} />
          ))}
        </div>
      </section>

      <footer className="bg-stone-950 text-stone-500 py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-white text-2xl font-serif font-bold mb-4">
              Niklas Bodega
            </h4>
            <p className="text-sm max-w-sm">
              An exclusive escape designed for those who appreciate the finer
              notes of life.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-xs uppercase tracking-widest md:justify-end">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Sustainability
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-16 text-center text-[10px] uppercase tracking-[0.3em] border-t border-stone-800 pt-8">
          © 2026 Niklas Bodega — Handcrafted Hospitality
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
