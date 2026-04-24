'use client';

import { IMDBMovie } from "@/src/types/movie";
import { useEffect, useRef, useState } from "react";
import { fetchTop250Movies } from "./services/top250Movies";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const MOVIES_PER_PAGE = 24;

export default function MoviesPage() {
    const [movies, setMovies] = useState<IMDBMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadTopMovies = async () => {
            try {
                setLoading(true);
                const data = await fetchTop250Movies();
                setMovies(data);
            } catch (err) {
                console.error("Failed to fetch Top 250 movies:", err);
            } finally {
                setLoading(false);
            }
        };
        loadTopMovies();
    }, []);

    const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
    
    const paginatedMovies = movies.slice(
        (currentPage - 1) * MOVIES_PER_PAGE,
        currentPage * MOVIES_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className="mt-20">
                <Banner />
            </div>

            <section ref={sectionRef} className="px-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-40 gap-4">
                        <div className="w-12 h-12 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm">Loading movies...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {paginatedMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </section>
        </div>
    );
}