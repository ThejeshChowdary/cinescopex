import { fetchFromTMDB } from "../../../lib/tmdb";

export default async function MovieDetails({ params }: any) {
    const details = await fetchFromTMDB(`/movie/${params.id}`);
    const credits = await fetchFromTMDB(`/movie/${params.id}/credits`);

    return (
        <div className="p-6">
            <div className="flex gap-6 flex-col md:flex-row">
                <img
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    className="rounded-xl w-full md:w-72"
                />

                <div>
                    <h1 className="text-4xl font-bold">{details.title}</h1>
                    <p className="mt-4 text-gray-300">{details.overview}</p>

                    <h3 className="mt-6 font-semibold">Cast:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {credits.cast.slice(0, 10).map((cast: any) => (
                            <span
                                key={cast.id}
                                className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                                {cast.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
