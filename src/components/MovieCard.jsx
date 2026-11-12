
import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, onDelete }) {
  const { title, year, duration, ageRating, poster, trailerId } = movie;
  const [hover, setHover] = useState(false);

  return (
    <article
      className="relative z-0 flex flex-col gap-2 transition-transform duration-300 ease-out hover:z-20 hover:scale-[1.04]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Póster y tráiler */}
      <div className="group relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#F00858] bg-black">
        {hover && trailerId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
            title={`Tráiler de ${title}`}
            className="pointer-events-none absolute left-1/2 top-0 h-full w-[300%] max-w-none -translate-x-1/2"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={poster}
            alt={`Cartel de ${title}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        {/* Icono de YouTube: aparece al pasar el cursor */}
        {trailerId && (
          <a
            href={`https://www.youtube.com/watch?v=${trailerId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver tráiler de ${title} en YouTube`}
            className="absolute right-2 top-2 z-20 rounded  p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-white hover:text-[#F00858]"
            >
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
          </a>
        )}
      </div>

      {/* Información de la película */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium leading-tight text-[#90E7FB]">
            {title}
          </h3>
          <p className="mt-0.5 text-[11px] text-gray-400">
            {year} · {duration}
          </p>
        </div>

        <span className="shrink-0 rounded border border-gray-500 px-1 text-[10px] leading-4 text-gray-400">
          {ageRating}
        </span>
      </div>

      {/* Botones CRUD */}
      <div className="flex gap-3 text-[11px]">
        <Link
          to={`/edit-movie/${movie.id}`}
          className="text-[#90E7FB] hover:underline"
        >
          Editar
        </Link>

        <button
          type="button"
          onClick={() => onDelete(movie.id)}
          className="cursor-pointer text-[#F00858] hover:underline"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
