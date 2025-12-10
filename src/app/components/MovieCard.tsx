import { IMDBMovie } from "@/src/types/movie";

interface MovieCardProps {
    movie: IMDBMovie;
}
export default function MovieCard({ movie }: MovieCardProps) {
    const image =
        movie.primaryImage ||
        movie.thumbnails?.[1]?.url ||
        movie.thumbnails?.[0]?.url ||
        "/no-image.jpg";

    return (
        <div className="group cursor-pointer">
            <img
                src={image}
                alt={movie.primaryTitle}
                className="rounded-lg shadow-lg w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Title */}
            <h3 className="mt-2 text-sm font-semibold line-clamp-1">
                {movie.primaryTitle}
            </h3>

            {/* Year */}
            {movie.startYear && (
                <p className="text-xs text-gray-400">{movie.startYear}</p>
            )}

            {/* Rating */}
            {movie.averageRating && (
                <p className="text-xs text-yellow-500">
                    ⭐ {movie.averageRating.toFixed(1)}
                </p>
            )}

            {/* Genres */}
            {movie.genres?.length > 0 && (
                <p className="text-xs mt-1 text-gray-300 line-clamp-1">
                    {movie.genres.join(", ")}
                </p>
            )}
        </div>
    );
}
