'use client';

import { IMDBMovie } from "@/src/types/movie";
import { useEffect, useState } from "react";
import { fetchTop250Movies } from "../services/top250Movies";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [movies, setMovies] = useState<IMDBMovie[]>([]);

    useEffect(() => {
        const loadTopMovies = async () => {
            try {
                const data = await fetchTop250Movies();
                setMovies(data);
            } catch (err) {
                console.error("Failed to fetch Top 250 movies:", err);
            }
        };

        loadTopMovies();
    }, []);

    return (
        <div>
            <div className="mt-20">
                <Banner />
            </div>
            <section className="px-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
}
