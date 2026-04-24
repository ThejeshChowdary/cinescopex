'use client';

import { useEffect, useRef, useState } from "react";
import Banner from "./components/Banner";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination"; // ← new
import { IMDBMovie } from "@/src/types/movie";
import { fetchTop250Movies } from "./movies/services/top250Movies";

const MOVIES_PER_PAGE = 24;

export default function Home() {
    const [movies, setMovies] = useState<IMDBMovie[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredMovies = searchQuery.trim()
        ? movies.filter((movie) =>
            movie.primaryTitle.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : movies;

    const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
    const paginatedMovies = filteredMovies.slice(
        (currentPage - 1) * MOVIES_PER_PAGE,
        currentPage * MOVIES_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <Navbar onSearch={setSearchQuery} />

            <div className="mt-20">
                {!searchQuery && <Banner />}
            </div>

            <section ref={sectionRef} className="px-6">
                <h2 className="text-2xl font-semibold mb-4">
                    {searchQuery
                        ? `Results for "${searchQuery}" (${filteredMovies.length})`
                        : "Trending Movies"}
                </h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-40 gap-4">
                        <div className="w-12 h-12 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm">Loading movies...</p>
                    </div>

                ) : paginatedMovies.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-40 gap-2">
                        <p className="text-3xl">No movies found for "<span className="text-red-500">{searchQuery}</span>"</p>
                        <p className="text-md text-gray-400">Try searching with a different keyword</p>
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