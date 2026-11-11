import { Link } from "react-router-dom";

const colTitle =
  "mb-3 text-sm font-semibold uppercase tracking-widest text-[#0a8cff] [text-shadow:0_0_8px_rgba(10,140,255,.6)]";
const linkClass = "text-sm transition hover:text-[#7fd8ff]";
const socialIcon = "h-7 w-7 drop-shadow-[0_0_5px_rgba(10,140,255,.7)]";
const divider = "md:border-l-2 md:border-[#0a8cff] md:px-8";

function Footer() {
  return (
    <footer className="bg-[#080817] px-6 pb-4 pt-6 text-slate-100 md:px-12 md:pt-7">
      <div className="grid gap-6 md:grid-cols-3 md:gap-0">
        {/* NAVEGACIÓN */}
        <nav aria-label="Navegación" className="md:pr-8">
          <h3 className={colTitle}>Navegación</h3>
          <ul className="grid gap-1">
            <li><Link className={linkClass} to="/">Inicio</Link></li>
            <li><Link className={linkClass} to="/movies">Catálogo</Link></li>
            <li><Link className={linkClass} to="/add-movie">Alquila tu sala</Link></li>
            <li><Link className={linkClass} to="/location">Ubicación</Link></li>
          </ul>
        </nav>

        {/* INFORMACIÓN */}
        <nav aria-label="Información" className={divider}>
          <h3 className={colTitle}>Información</h3>
          <ul className="grid gap-1">
            <li><a className={linkClass} href="#">Nuestra empresa</a></li>
            <li><a className={linkClass} href="#">Contacto</a></li>
            <li><a className={linkClass} href="#">Términos y condiciones</a></li>
            <li><a className={linkClass} href="#">Política de privacidad</a></li>
          </ul>
        </nav>

        {/* SÍGUENOS */}
        <div className={divider}>
          <h3 className={colTitle}>Síguenos</h3>
          <div className="flex flex-wrap gap-3 text-[#0a8cff]">
            <a href="#" aria-label="Instagram" className="transition hover:scale-110">
              <svg className={socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="X" className="transition hover:scale-110">
              <svg className={socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="transition hover:scale-110">
              <svg className={socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M15.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.3-1.3 1.4-1.3h1.4V6c-.3 0-1.1-.1-2.1-.1-2.1 0-3.4 1.2-3.4 3.5v1.9H10.5V14h2.3v7" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="transition hover:scale-110">
              <svg className={socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M10 8.5v7l6-3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* LÍNEA INFERIOR */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#0a8cff] pt-3 text-xs">
        <p>© 2026 Wormhole VideoClub. Todos los derechos reservados.</p>
        <div className="flex items-center gap-2 uppercase tracking-[.25em] text-[#0a8cff]">
          <span className="h-0.5 w-10 bg-[#0a8cff] shadow-[0_0_6px_#0a8cff]" />
          <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="16" cy="16" r="6" />
            <ellipse cx="16" cy="16" rx="14" ry="4.5" transform="rotate(-20 16 16)" />
          </svg>
          El cine nos une
        </div>
      </div>
    </footer>
  );
}

export default Footer;
