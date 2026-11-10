import { useState, useEffect, useRef } from 'react';

// Imágenes en src/img/covers
import hopeImg from '../img/covers/hope.jpg';
import clayfaceImg from '../img/covers/clayface.jpg';
import interstellarImg from '../img/covers/interstellar.jpg';
import godzillaImg from '../img/covers/godzilla.jpg';
import hungerGamesImg from '../img/covers/hunger-games.jpg';
import avengersImg from '../img/covers/avengers.jpg';

const slides = [
  ['TU PRÓXIMO UNIVERSO EMPIEZA AQUÍ', 'El cine nos <span class="text-[#ff1768]">une</span>', 'Historias que atraviesan galaxias. Experiencias que se quedan contigo.'],
  ['EXPLORA NUESTRO CATÁLOGO', 'Descubre <span class="text-[#ff1768]">nuevos mundos</span>', 'Desde los clásicos hasta los estrenos más esperados.'],
  ['EXPERIENCIAS ÚNICAS', 'Más que una <span class="text-[#ff1768]">pantalla</span>', 'DVD, Blu-ray, 3D y sonido envolvente te esperan.'],
  ['BIENVENIDO A WORMHOLE', 'Tu próxima <span class="text-[#ff1768]">película</span>', 'Explora el catálogo y encuentra algo que te sorprenda.']
];

const featuredMovies = [
  { title: 'Hope', description: 'Una aventura de ciencia ficción llena de misterio y descubrimientos.', img: hopeImg },
  { title: 'Clayface', description: 'Una historia oscura sobre identidad, transformación y secretos.', img: clayfaceImg },
  { title: 'Interstellar', description: 'Un viaje espacial sobre la exploración, el tiempo y los vínculos humanos.', img: interstellarImg },
];

const latestMovies = [
  { title: 'Godzilla Minus One', description: 'Una nueva aventura de monstruos gigantes y supervivencia.', img: godzillaImg },
  { title: 'Los juegos del hambre: Amanecer en la cosecha', description: 'Una nueva historia ambientada en el universo de Panem.', img: hungerGamesImg },
  { title: 'Vengadores: Doomsday', description: 'Los héroes se enfrentan a una amenaza que pone todo en juego.', img: avengersImg },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState({ open: false, title: '', content: null });
  const [toast, setToast] = useState({ show: false, message: '' });
  const toastTimer = useRef(null);

  const allMovies = [...featuredMovies, ...latestMovies];

  const filteredFeatured = featuredMovies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredLatest = latestMovies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notify = (message) => {
    setToast({ show: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, message: '' }), 2600);
  };

  const openModal = (title, content) => setModal({ open: true, title, content });
  const closeModal = () => setModal({ open: false, title: '', content: null });

  const handleSearch = (e) => {
    e.preventDefault();
    const count = allMovies.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).length;
    notify(searchQuery.trim() ? `${count} película(s) encontrada(s)` : 'Mostrando todas las películas');
    document.getElementById('peliculas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTrack = (id, direction) => {
    const track = document.getElementById(id);
    if (track) track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: 'smooth' });
  };

  useEffect(() => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }, []);

  return (
    <div className="min-h-screen bg-[#03050c] text-[#edf5ff] font-['Rajdhani',sans-serif] tracking-wide">
      {/* HEADER */}
      <header className="bg-[#020309] border-b border-[#06436a]" id="inicio">
        <div className="h-[84px] flex items-center justify-center relative max-[620px]:h-[68px] max-[620px]:justify-start max-[620px]:pl-5">
          <a href="#inicio" className="flex flex-col items-center text-[#ff1768] font-['Orbitron',sans-serif]">
            <span className="text-[clamp(24px,4vw,36px)] font-semibold tracking-tighter drop-shadow-[0_0_12px_#ff176899] max-[620px]:text-[25px]">
              WORMHOLE
            </span>
            <span className="text-[9px] text-[#00aeff] tracking-[5px] max-[620px]:text-[7px]">
              V I D E O C L U B
            </span>
          </a>

          <button
            className="hidden max-[620px]:block absolute right-[5%] top-[25px] bg-transparent border-0 p-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            type="button"
          >
            <span className="block w-6 h-0.5 bg-[#ff1768] my-[5px]"></span>
            <span className="block w-6 h-0.5 bg-[#ff1768] my-[5px]"></span>
            <span className="block w-6 h-0.5 bg-[#ff1768] my-[5px]"></span>
          </button>
        </div>

        <nav className={`
          h-12 max-w-[1200px] mx-auto px-6 flex items-center gap-8
          max-[620px]:${menuOpen ? 'flex' : 'hidden'} max-[620px]:h-auto max-[620px]:flex-wrap max-[620px]:gap-4 max-[620px]:px-5 max-[620px]:pb-[18px]
        `}>
          <a href="#inicio" onClick={() => setMenuOpen(false)} className="text-[13px] uppercase text-[#b9eaff] hover:text-[#ff1768] transition-colors max-[620px]:text-xs">Inicio</a>
          <a href="#peliculas" onClick={() => setMenuOpen(false)} className="text-[13px] uppercase text-[#b9eaff] hover:text-[#ff1768] transition-colors max-[620px]:text-xs">Películas</a>
          <a href="#ubicacion" onClick={() => setMenuOpen(false)} className="text-[13px] uppercase text-[#b9eaff] hover:text-[#ff1768] transition-colors max-[620px]:text-xs">Ubicación</a>
          <a href="#" className="text-[23px] text-[#b9eaff] hover:text-[#ff1768]" aria-label="Más información">⊕</a>

          <form onSubmit={handleSearch} className="ml-auto w-[220px] h-8 border border-[#00aeff] rounded-full flex overflow-hidden max-[620px]:w-full max-[620px]:ml-0">
            <input
              type="search"
              placeholder="Buscar película..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white px-3"
              aria-label="Buscar película"
            />
            <button type="submit" className="w-[38px] bg-transparent border-0 text-[#00aeff] text-2xl cursor-pointer" aria-label="Buscar">⌕</button>
          </form>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="h-[410px] relative grid place-items-center text-center overflow-hidden
          bg-[radial-gradient(ellipse_at_50%_65%,#123c5c_0,transparent_36%),radial-gradient(ellipse_at_50%_10%,#17142f_0,transparent_48%),linear-gradient(120deg,#080b16,#03050c_65%,#0a1424)]
          max-[620px]:h-[320px]">
          
          {/* Órbitas decorativas */}
          <div className="absolute w-[460px] h-[460px] border border-[#087cb855] rounded-full scale-y-[0.28] -rotate-[25deg] shadow-[0_0_35px_#00aaff22]"></div>
          <div className="absolute w-[590px] h-[590px] border border-[#087cb855] rounded-full scale-y-[0.28] -rotate-[25deg] shadow-[0_0_35px_#00aaff22]"></div>

          <div className="relative z-10 px-4 max-[620px]:px-[18px]">
            <p className="text-[11px] tracking-[3px] text-[#00aeff] mb-3 uppercase">{slides[currentSlide][0]}</p>
            <h1
              className="font-['Orbitron',sans-serif] text-[clamp(28px,5vw,48px)] font-bold leading-tight mb-3"
              dangerouslySetInnerHTML={{ __html: slides[currentSlide][1] }}
            />
            <p className="text-[#91a7bb] text-lg mb-6 max-w-md mx-auto max-[620px]:text-base">
              {slides[currentSlide][2]}
            </p>
            <a
              href="#peliculas"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#00aeff] rounded text-[#00aeff] text-sm uppercase tracking-wider hover:bg-[#00aeff15] transition-colors"
            >
              Explorar películas <b>→</b>
            </a>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full border border-[#00aeff] transition-colors ${
                  currentSlide === i ? 'bg-[#00aeff]' : 'bg-transparent'
                }`}
                aria-label={`Diapositiva ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* PELÍCULAS DESTACADAS */}
        <section className="py-10 max-w-[1200px] mx-auto px-6" id="peliculas">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[11px] tracking-[3px] text-[#00aeff] uppercase mb-1">NO TE LAS PIERDAS</p>
              <h2 className="font-['Orbitron',sans-serif] text-xl">Películas destacadas</h2>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollTrack('featuredTrack', -1)} className="w-9 h-9 border border-[#00aeff] rounded text-[#00aeff] hover:bg-[#00aeff20] transition-colors">←</button>
              <button type="button" onClick={() => scrollTrack('featuredTrack', 1)} className="w-9 h-9 border border-[#00aeff] rounded text-[#00aeff] hover:bg-[#00aeff20] transition-colors">→</button>
            </div>
          </div>

          <div id="featuredTrack" className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide">
            {filteredFeatured.map((movie) => (
              <button
                key={movie.title}
                type="button"
                onClick={() => openModal(movie.title, movie.description)}
                className="flex-shrink-0 basis-[180px] min-[900px]:basis-[220px] text-left group"
              >
                <img
                  src={movie.img}
                  alt={`Cartel de ${movie.title}`}
                  className="w-full h-[250px] min-[900px]:h-[300px] object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                />
                <span className="text-sm text-[#edf5ff]">{movie.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ÚLTIMAS INCORPORACIONES */}
        <section className="py-6 max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[11px] tracking-[3px] text-[#00aeff] uppercase mb-1">RECIÉN LLEGADAS</p>
              <h2 className="font-['Orbitron',sans-serif] text-xl">Últimas incorporaciones</h2>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollTrack('latestTrack', -1)} className="w-9 h-9 border border-[#00aeff] rounded text-[#00aeff] hover:bg-[#00aeff20] transition-colors">←</button>
              <button type="button" onClick={() => scrollTrack('latestTrack', 1)} className="w-9 h-9 border border-[#00aeff] rounded text-[#00aeff] hover:bg-[#00aeff20] transition-colors">→</button>
            </div>
          </div>

          <div id="latestTrack" className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
            {filteredLatest.map((movie) => (
              <button
                key={movie.title}
                type="button"
                onClick={() => openModal(movie.title, movie.description)}
                className="flex-shrink-0 basis-[180px] min-[900px]:basis-[220px] text-left group"
              >
                <img
                  src={movie.img}
                  alt={`Cartel de ${movie.title}`}
                  className="w-full h-[250px] min-[900px]:h-[300px] object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                />
                <span className="text-sm text-[#edf5ff]">{movie.title}</span>
              </button>
            ))}
          </div>

          {filteredFeatured.length + filteredLatest.length === 0 && (
            <p className="text-center text-[#91a7bb] mt-4">No se encontraron películas. Prueba con otro título.</p>
          )}
        </section>

        {/* SERVICIOS */}
        <section className="py-12 max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[3px] text-[#00aeff] uppercase mb-2">MÁS QUE UNA PANTALLA</p>
            <h2 className="font-['Orbitron',sans-serif] text-2xl mb-3">Mucho más que cine</h2>
            <p className="text-[#91a7bb] max-w-lg mx-auto">
              De los clásicos al cine actual, descubre un universo de películas, formatos y experiencias cinematográficas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { icon: '◎', title: 'DVD y Blu-ray', desc: 'Colecciona tus favoritos.' },
              { icon: '◉', title: 'Cine en 3D', desc: 'Vive otra dimensión.' },
              { icon: '▣', title: 'Alta definición', desc: 'Detalles que impresionan.' },
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
            className="mx-auto block px-8 py-3 border border-[#ff1768] text-[#ff1768] text-sm tracking-wider uppercase hover:bg-[#ff176815] transition-colors"
          >
            DEL PASADO AL FUTURO, EL CINE TE ESPERA. <span>→</span>
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#020309] border-t border-[#06436a] pt-10 pb-6" id="ubicacion">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-xs tracking-widest text-[#00aeff] uppercase mb-3">Navegación</h2>
            <div className="flex flex-col gap-1.5 text-sm">
              <a href="#inicio" className="hover:text-[#ff1768] transition-colors">Inicio</a>
              <a href="#peliculas" className="hover:text-[#ff1768] transition-colors">Catálogo</a>
              <a href="#ubicacion" className="hover:text-[#ff1768] transition-colors">Ubicación</a>
            </div>
          </div>
          <div>
            <h2 className="text-xs tracking-widest text-[#00aeff] uppercase mb-3">Información</h2>
            <div className="flex flex-col gap-1.5 text-sm">
              <a href="#" className="hover:text-[#ff1768] transition-colors">Nuestra empresa</a>
              <a href="#" className="hover:text-[#ff1768] transition-colors">Contacto</a>
              <a href="#" className="hover:text-[#ff1768] transition-colors">Términos y condiciones</a>
              <a href="#" className="hover:text-[#ff1768] transition-colors">Política de privacidad</a>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xs tracking-widest text-[#00aeff] uppercase mb-3">Síguenos</h2>
            <div className="flex gap-3">
              {['◎', '𝕏', 'f', '▷'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#00aeff] rounded flex items-center justify-center text-[#00aeff] hover:bg-[#00aeff20] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#91a7bb]">
          <p>© <span id="year"></span> Wormhole VideoClub. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 tracking-widest">
            <span className="w-6 h-px bg-[#00aeff]"></span>
            <b className="text-[#00aeff] text-xl">◉</b>
            <span className="text-[10px]">EL CINE NOS UNE</span>
            <span className="w-6 h-px bg-[#00aeff]"></span>
          </div>
        </div>
      </footer>

      {/* MODAL */}
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
