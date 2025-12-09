import https from "https";
import { IMDBMovie } from "@/src/types/movie";

interface SearchParams {
    originalTitle?: string;
    primaryTitle?: string;
    primaryTitleAutocomplete?: string;
    type?: "movie" | "genre";
    genre?: string;
    genres?: string[];
    isAdult?: boolean;
    averageRatingFrom?: number;
    averageRatingTo?: number;
    numVotesFrom?: number;
    numVotesTo?: number;
    rows?: number;
    startYearFrom?: number;
    startYearTo?: number;
    countriesOfOrigin?: string; // ISO 3166-1 alpha-2
    spokenLanguages?: string; // ISO 639-1
    sortOrder?: "ASC" | "DESC";
    sortField?: string;
    cursorMark?: string;
}

export const fetchMoviesBySearch = (params: SearchParams = {}): Promise<IMDBMovie[]> => {
    return new Promise((resolve, reject) => {
        const query = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => {
                // Handle array values
                if (Array.isArray(value)) return value.map(v => `${key}[]=${encodeURIComponent(v)}`).join("&");
                return `${key}=${encodeURIComponent(value as any)}`;
            })
            .join("&");

        const path = `/api/imdb/search?${query}`;

        const options = {
            method: "GET",
            hostname: "imdb236.p.rapidapi.com",
            path,
            headers: {
                "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
                "x-rapidapi-host": "imdb236.p.rapidapi.com"
            }
        };

        const req = https.request(options, (res) => {
            const chunks: any[] = [];

            res.on("data", chunk => chunks.push(chunk));
            res.on("end", () => {
                try {
                    const body = Buffer.concat(chunks).toString();
                    const data = JSON.parse(body);

                    if (Array.isArray(data)) {
                        resolve(data as IMDBMovie[]);
                    } else if (Array.isArray(data?.titles)) {
                        resolve(data.titles as IMDBMovie[]);
                    } else if (Array.isArray(data?.movies)) {
                        resolve(data.movies as IMDBMovie[]);
                    } else {
                        resolve([]);
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });

        req.on("error", reject);
        req.end();
    });
};
