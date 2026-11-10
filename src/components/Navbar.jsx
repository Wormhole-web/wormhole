import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../img/Logotipo_WORMHOLE.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Películas" },
  { to: "/location", label: "Ubicación" },
];

function Navbar() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#F00858] ${
      isActive ? "text-[#F00858]" : "text-[#90E7FB]"
    }`;

  return (
    <header className="bg-black px-4 pb-4 pt-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Logo + botón hamburguesa */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col items-center leading-none">
            <Link to="/" className="flex items-center">
  <img
    src={logo}
    alt="Wormhole Videoclub"
    className="w-52 sm:w-64 h-auto object-contain"
  />
</Link>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Abrir o cerrar menú"
            aria-expanded={open}
            className="flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className="h-0.5 w-7 bg-[#F00858]" />
            <span className="h-0.5 w-7 bg-[#F00858]" />
            <span className="h-0.5 w-7 bg-[#F00858]" />
          </button>
        </div>

        {/* Enlaces + añadir + buscador */}
        <nav
          className={`${
            open ? "flex" : "hidden"
          } mt-8 flex-wrap items-center justify-between gap-4 md:flex`}
        >
          <div className="flex items-center gap-5">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>
                {label}
              </NavLink>
            ))}

            <NavLink
              to="/add-movie"
              aria-label="Añadir película"
              className={({ isActive }) =>
                `transition-colors hover:text-[#F00858] ${
                  isActive ? "text-[#F00858]" : "text-[#90E7FB]"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 8v8M8 12h8" />
              </svg>
            </NavLink>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full max-w-xs sm:w-64"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => {
  const value = e.target.value;
  setSearch(value);

  navigate(
    value.trim()
      ? `/movies?search=${encodeURIComponent(value)}`
      : "/movies",
    { replace: true }
  );
}}
              placeholder="Buscar película..."
              aria-label="Buscar película"
              className="h-10 w-full rounded-full border-2 border-[#168BFF] bg-transparent pl-4 pr-10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#168BFF]/50"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#168BFF]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;