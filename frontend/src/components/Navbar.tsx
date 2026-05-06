import {useNavigate} from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate();

    return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="text-2xl font-serif font-bold tracking-tighter text-orange-900">
            NIKLAS BODEGA
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            {['Rooms', 'Restaurant', 'Experience', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-700 transition">
                    {item}
                </a>
            ))}
        </div>
        <div className="flex items-center gap-3">
            <button
                onClick={() => navigate('/login')}
                className="border border-orange-900 text-orange-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-50 transition">
                LOGIN
            </button>
            <button className="bg-orange-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-800 transition">
                BOOK NOW
            </button>
        </div>
    </nav>
    )
};

export default Navbar;