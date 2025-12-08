import Link from "next/link";

export default function MovieCard({ movie }: any) {
    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="hover:scale-105 transition">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="rounded-lg shadow-lg"
                />
                <h2 className="text-sm mt-2 font-semibold line-clamp-1">
                    {movie.title}
                </h2>
            </div>
        </Link>
    );
}
