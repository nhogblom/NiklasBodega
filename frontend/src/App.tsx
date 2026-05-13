import './App.css';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import { useAuth } from './hooks/useAuth.tsx';
import MyBookingsPage from './pages/BookingsPage/MyBookings/MyBookingsPage.tsx';
import NewBookingsPage from './pages/BookingsPage/NewBookings/NewBookingsPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import RoomsPage from './pages/RoomsPage/RoomsPage.tsx';
import OAuthRedirectPage from './pages/OAuthRedirectPage.tsx';

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-400 text-sm uppercase tracking-widest">
          Loading...
        </p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/roomspage" element={<RoomsPage />} />
        <Route path="/oauth2/redirect" element={<OAuthRedirectPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/myBookings" element={<MyBookingsPage />} />
          <Route path="/newBooking" element={<NewBookingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
