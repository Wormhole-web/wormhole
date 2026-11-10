import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { deleteMovie, getMovies } from "../services/MovieServices";
import MovieGrid from "../components/MovieGrid";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim().toLowerCase();

  useEffect(() => {
    getMovies().then(setMovies).catch(() => setError(true));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta película?")) return;
    try {
      await deleteMovie(id);
      setMovies((previousMovies) =>
        previousMovies.filter((movie) => movie.id !== id)
      );
    } catch {
      alert("No se pudo eliminar");
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search)
  );

  return (
    <main className="min-h-screen bg-black px-4 pb-12 pt-8 sm:px-8 lg:px-16">
      {error && (
        <p className="mb-4 text-center text-[#F00858]">
          No se pudo cargar la API. ¿Está corriendo npm run api?
        </p>
      )}

      {filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} onDelete={handleDelete} />
      ) : (
        <p className="py-16 text-center text-[#90E7FB]">
          No se encontraron películas.
        </p>
      )}

      <hr className="mx-auto mt-10 max-w-6xl border-0 border-t border-[#F00858]" />
    </main>
  );
}

export default Movies;
