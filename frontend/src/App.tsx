import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import ReservationPage from "./pages/ReservationPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/reservation/:id" element={<ReservationPage />} />
    </Routes>
      <Footer />
    </>
  );
}

export default App;