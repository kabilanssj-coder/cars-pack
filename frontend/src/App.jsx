import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import CinematicIntro from "./components/CinematicIntro";
import PublicLayout from "./components/PublicLayout";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import SellYourCar from "./pages/SellYourCar";
import About from "./pages/About";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminCars from "./admin/pages/AdminCars";
import CarForm from "./admin/pages/CarForm";
import AdminEnquiries from "./admin/pages/AdminEnquiries";
import AdminSellRequests from "./admin/pages/AdminSellRequests";
import AdminBranches from "./admin/pages/AdminBranches";
import AdminSettings from "./admin/pages/AdminSettings";

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <AuthProvider>
      {!introDone && <CinematicIntro onFinish={() => setIntroDone(true)} />}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/sell-your-car" element={<SellYourCar />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="cars/new" element={<CarForm />} />
          <Route path="cars/:id/edit" element={<CarForm />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="sell-requests" element={<AdminSellRequests />} />
          <Route path="branches" element={<AdminBranches />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
