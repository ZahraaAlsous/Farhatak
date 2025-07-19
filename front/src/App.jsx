// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Register from './Pages/Register.jsx';
import Servic from './Pages/Servic.jsx';
import DetailsService from './Pages/DetailsService.jsx';
import UserBookings from './Pages/UserBooking.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import HeroLanding from './Pages/Home.jsx';
import Footer from './Components/footer.jsx';
import LoginForm from './Components/login.jsx';
import VServic from './Pages/VendoreService.jsx';
import VDetailsService from './Pages/VendorDetailsService.jsx';
import AddListingPage from './Pages/vendors1.jsx';
import RegisterForm from './Components/register.jsx';
import BookingsPage from './Pages/bookingPage.jsx';
import VendorProfile from './Pages/vendorProfile.jsx';
import RegisterFormv from './Components/VenderRegister.jsx';
import Users from './Admin/Users.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import Vendors from './Admin/Vendors.jsx'
import Services from './Admin/services.jsx'
import LandingPage from './Pages/landingPage.jsx';
import Packages from './Pages/Packages.jsx';
import AboutUs from './Pages/AboutUs.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/registerv" element={<RegisterFormv />} />
          <Route path="/service" element={<Servic />} />
          <Route path="/Vservice" element={<VServic />} />
          <Route path="/dservice" element={<DetailsService />} />
          <Route path="/vdservice" element={<VDetailsService />} />
          <Route path="/UserBookings" element={<UserBookings />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Home" element={<HeroLanding />} />
          <Route path="/AddListingPage" element={<AddListingPage />} />
          <Route path="/BookingsPage" element={<BookingsPage />} />
          <Route path="/VendorProfile" element={<VendorProfile />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-usersData" element={<Users />} />
          <Route path="/admin-vendorsData" element={<Vendors />} />
          <Route path="/admin-servicesData" element={<Services />} />
          <Route path="/Packages" element={<Packages />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App
