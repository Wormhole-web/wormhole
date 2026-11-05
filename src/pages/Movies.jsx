import data from "../../movies.json";
import MovieGrid from "../components/MovieGrid";

function Movies() {
  return (
    <main className="min-h-screen bg-black px-4 pb-12 pt-8 sm:px-8 lg:px-16">
      <MovieGrid movies={data.movies} />
       <hr className="mx-auto mt-10 max-w-6xl border-0 border-t border-[#F00858]" />
    </main>
  );
}

export default Movies;