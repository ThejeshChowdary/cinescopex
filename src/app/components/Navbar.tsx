'use client';

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<string>("movies");

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query)}`);
        setQuery("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    const handleTabClick = (tab: string, path: string) => {
        setActiveTab(tab);
        router.push(path);
    };

    return (
        <nav className="w-full bg-black/30 backdrop-blur-md border-b border-gray-800 fixed top-0 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4 md:gap-0">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-red-500 cursor-pointer" onClick={() => router.push("/")}>
                    CineScopeX
                </h1>
                <div className="flex flex-row gap-12">
                    {/* Tabs */}
                    <div className="flex items-center gap-6">
                        <button
                            className={`text-white font-semibold hover:text-red-500 cursor-pointer transition ${activeTab === "upcoming" ? "text-red-500" : ""}`}
                            onClick={() => handleTabClick("upcoming", "/upcoming")}
                        >
                            Trending
                        </button>
                        <button
                            className={`text-white font-semibold hover:text-red-500 transition cursor-pointer  ${activeTab === "movies" ? "text-red-500" : ""}`}
                            onClick={() => handleTabClick("movies", "/movies")}
                        >
                            Movies
                        </button>
                        <button
                            className={`text-white font-semibold hover:text-red-500 transition cursor-pointer  ${activeTab === "tv" ? "text-red-500" : ""}`}
                            onClick={() => handleTabClick("tv", "/tv")}
                        >
                            TV Shows
                        </button>
                        <button
                            className={`text-white font-semibold hover:text-red-500 transition cursor-pointer  ${activeTab === "upcoming" ? "text-red-500" : ""}`}
                            onClick={() => handleTabClick("upcoming", "/upcoming")}
                        >
                            Most Popular
                        </button>
                        <button
                            className={`text-white font-semibold hover:text-red-500 transition cursor-pointer  ${activeTab === "upcoming" ? "text-red-500" : ""}`}
                            onClick={() => handleTabClick("upcoming", "/upcoming")}
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
