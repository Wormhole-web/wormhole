
import { useSearchParams } from "react-router-dom";
import data from "../../movies.json";
import MovieGrid from "../components/MovieGrid";

function Movies() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredMovies = data.movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black px-4 pb-12 pt-8 sm:px-8 lg:px-16">
      {filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} />
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
