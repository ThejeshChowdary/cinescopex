import MovieCard from "../components/MovieCard";
import { fetchFromTMDB } from "../lib/tmdb";

export default async function Home() {
    const { results: trending } = await fetchFromTMDB("/trending/movie/day");
    const { results: popular } = await fetchFromTMDB("/movie/popular");

    return (
        <div className="px-6">
            <h1 className="text-3xl font-bold my-6">Trending Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {trending.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <h1 className="text-3xl font-bold my-6">Popular Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popular.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
