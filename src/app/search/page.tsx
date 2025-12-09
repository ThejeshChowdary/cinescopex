'use client';

import { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Banner from "../components/Banner";
import { IMDBMovie } from "@/src/types/movie";
import { fetchMoviesBySearch } from "../services/fetchMoviesBySearchService";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<IMDBMovie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const data = await fetchMoviesBySearch({
                primaryTitleAutocomplete: query,
                type: "movie",
                rows: 50
            });
            setMovies(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div>
            <Navbar />
            <Banner />

            <section className="px-6 mt-8">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="border rounded-lg p-2 flex-1"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>

                {loading && <p className="text-gray-300">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {movies.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && movies.length === 0 && query && (
                    <p className="text-gray-400 mt-4">No movies found for "{query}"</p>
                )}
            </section>
        </div>
    );
}
