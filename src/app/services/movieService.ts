import https from "https";
import { IMDBMovie } from "@/src/types/movie";

export const fetchCastMovies = (castId: string = "nm0000190"): Promise<IMDBMovie[]> => {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            hostname: "imdb236.p.rapidapi.com",
            path: `/api/imdb/cast/${castId}/titles`,
            headers: {
                "x-rapidapi-key": "02819a48efmsh0605327fe3f366ep1e086ajsn0df82175eb02",
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
