import type { Room } from '../../../../types/Room.ts';

const BookingRoomCard = ({ room }: { room: Room }) => {
  return (
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
  );
};
export default BookingRoomCard;
