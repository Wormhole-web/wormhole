import { useEffect, useState } from "react"; // NUEVO
import { getMovies, deleteMovie } from "../services/MovieServices"; // NUEVO
import data from "../../movies.json";
import MovieGrid from "../components/MovieGrid";

function Movies() {
  // NUEVO
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMovies().then(setMovies).catch(() => setError(true));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta película?")) return;
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("No se pudo eliminar");
    }
  };

  return (
    <main className="min-h-screen bg-black px-4 pb-12 pt-8 sm:px-8 lg:px-16">
      {error && (
        <p className="mb-4 text-center text-[#F00858]">
          No se pudo cargar la API. ¿Está corriendo npm run api?
        </p>
      )}

      <MovieGrid movies={movies} onDelete={handleDelete} />
      <hr className="mx-auto mt-10 max-w-6xl border-0 border-t border-[#F00858]" />
    </main>
  );
}

export default Movies;