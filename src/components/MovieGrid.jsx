import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <section
      aria-label="Catálogo de películas"
      className="mx-auto grid max-w-6xl grid-cols-3 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-5 md:grid-cols-5 lg:grid-cols-6"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieGrid;