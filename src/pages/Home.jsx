import Hero from "../components/Hero";
import { useState, useEffect, useRef } from 'react';
import moviesData from '../../movies.json'; // Ajusta la ruta a tu movies.json

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState({ open: false, title: '', content: null });
  const [toast, setToast] = useState({ show: false, message: '' });
  const toastTimer = useRef(null);

  useEffect(() => {
    if (moviesData && moviesData.movies) {
      setMovies(moviesData.movies);
    }
  }, []);

  // Filtrado general por buscador si escriben algo
  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // APARTADO 1: Tendencias cinematográficas (Tomamos exactamente las primeras 9 películas)
  const trendingMovies = filteredMovies.slice(0, 9);

  // APARTADO 2: Últimas incorporaciones (Tomamos exactamente las siguientes 9 películas, sin repetir con las de arriba)
  const latestMovies = [...filteredMovies]
    .sort((a, b) => b.year - a.year)
    .slice(9, 18);

  const openModal = (title, content) => setModal({ open: true, title, content });
  const closeModal = () => setModal({ open: false, title: '', content: null });

  const scrollTrack = (id, direction) => {
    const track = document.getElementById(id);
    if (track) track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#03050c] text-[#edf5ff] font-['Rajdhani',sans-serif] tracking-wide">
      <main>
      <Hero />
        {/* 1. TENDENCIAS CINEMATOGRÁFICAS (Primeras 9 películas) */}
        <section className="py-8 max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-['WormholeFont'] text-xl text-[#90E7FB]">Tendencias cinematograficas</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollTrack('netflixTrack', -1)} className="w-9 h-9 border border-[#ff1768] rounded text-[#ff1768] hover:bg-[#ff176820] transition-colors">←</button>
              <button type="button" onClick={() => scrollTrack('netflixTrack', 1)} className="w-9 h-9 border border-[#ff1768] rounded text-[#ff1768] hover:bg-[#ff176820] transition-colors">→</button>
            </div>
          </div>

          <div id="netflixTrack" className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide">
            {trendingMovies.map((movie) => (
              <button
                key={`trending-${movie.id || movie.title}`}
                type="button"
                onClick={() => openModal(movie.title, `${movie.year} • ${movie.duration}`)}
                className="flex-shrink-0 basis-[180px] min-[900px]:basis-[210px] text-left group cursor-pointer"
              >
                <div className="border-2 border-[#ff1768] rounded-2xl overflow-hidden mb-2 group-hover:scale-[1.02] transition-transform shadow-[0_0_15px_#ff176833]">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-[260px] min-[900px]:h-[310px] object-cover"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold text-[#00aeff]">{movie.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded text-gray-300">
                    {movie.ageRating || movie.age || '12'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{movie.year} • {movie.duration}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 2. ÚLTIMAS INCORPORACIONES (Siguientes 9 películas sin repetir) */}
        <section className="py-8 max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-['WormholeFont'] text-xl text-[#90E7FB]">Ultimas incorporaciones</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollTrack('latestTrack', -1)} className="w-9 h-9 border border-[#00aeff] rounded text-[#00aeff] hover:bg-[#00aeff20] transition-colors">←</button>
              <button type="button" onClick={() => scrollTrack('latestTrack', 1)} className="w-9 h-9 border border-[#00aeff] rounded text-[#00aeff] hover:bg-[#00aeff20] transition-colors">→</button>
            </div>
          </div>

          <div id="latestTrack" className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide">
            {latestMovies.length > 0 ? (
              latestMovies.map((movie) => (
                <button
                  key={`latest-${movie.id || movie.title}`}
                  type="button"
                  onClick={() => openModal(movie.title, `${movie.year} • ${movie.duration}`)}
                  className="flex-shrink-0 basis-[180px] min-[900px]:basis-[210px] text-left group cursor-pointer"
                >
                  <div className="border-2 border-[#00aeff] rounded-2xl overflow-hidden mb-2 group-hover:scale-[1.02] transition-transform shadow-[0_0_15px_#00aaff33]">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-[260px] min-[900px]:h-[310px] object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold text-[#00aeff]">{movie.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded text-gray-300">
                      {movie.ageRating || movie.age || '12'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{movie.year} • {movie.duration}</p>
                </button>
              ))
            ) : (
              <p className="text-xs text-gray-400">Agrega más películas en tu JSON para ver contenido en este apartado.</p>
            )}
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="py-12 max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[3px] text-[#00aeff] uppercase mb-2">MÁS QUE UNA PANTALLA</p>
            <h2 className="font-['WormholeFont'] text-2xl mb-3 text-[#90E7FB]">Mucho mas que cine</h2>
            <p className="text-[#91a7bb] max-w-lg mx-auto">
              De los clásicos al cine actual, descubre un universo de películas, formatos y experiencias cinematográficas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-[#90E7FB]">
            {[
              { icon: '◎', title: 'DVD y Blu-ray', desc: 'Colecciona tus favoritos.' },
              { icon: '◉', title: 'Cine en 3D', desc: 'Vive otra dimensión.' },
              { icon: '▣', title: 'Alta definición' , desc: 'Detalles que impresionan.' },
              { icon: '♫', title: 'Sonido envolvente', desc: 'Sumérgete en cada historia.' },
            ].map((s) => (
              <article key={s.title} className="flex gap-3 items-start">
                <span className="text-3xl text-[#00aeff]">{s.icon}</span>
                <div>
                  <h3 className="font-semibold text-base mb-0.5">{s.title}</h3>
                  <p className="text-sm text-[#91a7bb]">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openModal('Alquila tu sala', 'Formulario de reserva próximamente.')}
            className="mx-auto block px-8 py-3 border rounded-full border-[#ff1768] text-[#ff1768] text-sm tracking-wider font-['WormholeFont'] uppercase hover:bg-[#ff176815] transition-colors"
          >
            DEL PASADO AL FUTURO, EL CINE TE ESPERA. <span>→</span>
          </button>
        </section>
      </main>

      {modal.open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4"
          onClick={closeModal}
        >
          <section
            className="relative w-full max-w-md max-h-[85vh] overflow-auto bg-[#07101d] border border-[#00aeff] rounded-xl p-7 shadow-[0_0_35px_#00aaff33]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-2 text-[#00aeff] text-3xl bg-transparent border-0 cursor-pointer"
              aria-label="Cerrar"
            >
              ×
            </button>
            <p className="text-[11px] tracking-[3px] text-[#00aeff] uppercase">WORMHOLE VIDEOCLUB</p>
            <h2 className="font-['Orbitron',sans-serif] text-xl text-[#ff1768] my-2.5">{modal.title}</h2>
            <div className="text-[#c2d0dd]">
              {typeof modal.content === 'string' ? <p>{modal.content}</p> : modal.content}
            </div>
          </section>
        </div>
      )}

      {/* TOAST */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-[#07101d] border border-[#00aeff] rounded text-sm text-white shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}

