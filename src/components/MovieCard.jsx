import { Link } from "react-router-dom";

function MovieCard({ movie, onDelete }) {
  const { title, year, duration, ageRating, poster } = movie;

  return (
    <article className="flex flex-col gap-2">
      <div className="aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#F00858] bg-black">
        <img
          src={poster}
          alt={`Cartel de ${title}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

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

      <div className="flex gap-3 text-[11px]">
        <Link to={`/edit-movie/${movie.id}`} className="text-[#90E7FB] hover:underline">
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