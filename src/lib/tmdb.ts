export const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
        },
        // @ts-ignore
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch TMDB: ${res.status}`);
    }

    return res.json();
}
