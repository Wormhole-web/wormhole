import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import emblema from "./img/Emblema.png";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";
import Location from "./pages/Location";

function App() {
  useEffect(() => {
    document.title = "Wormhole VideoClub";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = emblema;
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/location" element={<Location />} />
        <Route path="/edit-movie/:id" element={<AddMovie />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;