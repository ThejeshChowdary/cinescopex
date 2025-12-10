'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<string>("movies");

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const moviesList = [
        { title: "Action", path: "/movies/action" },
        { title: "Comedy", path: "/movies/comedy" },
        { title: "Horror", path: "/movies/horror" },
        { title: "Sci-Fi", path: "/movies/sci-fi" },
    ];

    const tvShowsList = [
        { title: "Top 250", path: "/tvshows/top-250" },
        { title: "Most Popular", path: "/tvshows/most-popular" },
    ];

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query)}`);
        setQuery("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    const goTo = (path: string, tab?: string) => {
        if (tab) setActiveTab(tab);
        router.push(path);
        setOpenDropdown(null);
    };

    return (
        <nav className="w-full bg-black/30 backdrop-blur-md border-b border-gray-800 fixed top-0 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4 md:gap-0">

                {/* Logo */}
                <h1
                    className="text-2xl font-bold text-red-500 cursor-pointer"
                    onClick={() => goTo("/")}
                >
                    CineScopeX
                </h1>

                <div className="flex flex-row gap-12 relative">

                    {/* Tabs */}
                    <div className="flex items-center gap-6">

                        {/* Trending */}
                        <button
                            className={`text-white font-semibold hover:text-red-500 transition ${activeTab === "trending" ? "text-red-500" : ""}`}
                            onClick={() => goTo("/trending", "trending")}
                        >
                            Trending
                        </button>

                        {/* Movies (dropdown) */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown("movies")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button
                                className={`text-white font-semibold hover:text-red-500 transition ${activeTab === "movies" ? "text-red-500" : ""}`}
                                onClick={() => goTo("/movies", "movies")}
                            >
                                Movies ▾
                            </button>

                            {openDropdown === "movies" && (
                                <div className="absolute left-0 mt-2 bg-black border border-gray-700 rounded-md shadow-lg p-2 w-40">
                                    {moviesList.map((item) => (
                                        <div
                                            key={item.title}
                                            className="text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
                                            onClick={() => goTo(item.path)}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* TV Shows (dropdown) */}
                        {/* TV Shows (dropdown) */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown("tvshows")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button
                                className={`text-white font-semibold hover:text-red-500 transition ${activeTab === "tvshows" ? "text-red-500" : ""
                                    }`}
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "tvshows" ? null : "tvshows")
                                }
                            >
                                TV Shows ▾
                            </button>

                            {openDropdown === "tvshows" && (
                                <div className="absolute left-0 mt-2 z-50">

                                    {/* Triangle */}
                                    <div
                                        className="absolute -top-2 left-4 w-4 h-4 bg-black border-l border-t border-gray-700 rotate-45"
                                    />

                                    {/* Dropdown box */}
                                    <div className="relative bg-black border border-gray-700 rounded-md shadow-lg p-2 min-w-[140px]">

                                        {tvShowsList.map((item) => (
                                            <div
                                                key={item.title}
                                                className="text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
                                                onClick={() => {
                                                    setOpenDropdown(null);
                                                    goTo(item.path);
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                        <button
                            className={`text-white font-semibold hover:text-red-500 transition ${activeTab === "most-popular" ? "text-red-500" : ""}`}
                            onClick={() => goTo("/most-popular", "most-popular")}
                        >
                            Most Popular
                        </button>

                        <button
                            className={`text-white font-semibold hover:text-red-500 transition ${activeTab === "upcoming" ? "text-red-500" : ""}`}
                            onClick={() => goTo("/upcoming", "upcoming")}
                        >
                            Upcoming
                        </button>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="p-2 rounded-md border border-gray-700 bg-black/50 text-white flex-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
