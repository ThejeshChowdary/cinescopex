export interface IMDBThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface IMDBProductionCompany {
    id: string;
    name: string;
}

export interface IMDBMovie {
    id: string;
    url: string;
    primaryTitle: string;
    originalTitle: string;
    type: string;
    description: string;
    primaryImage: string;
    thumbnails: IMDBThumbnail[];
    trailer: string | null;
    contentRating: string | null;
    isAdult: boolean;
    releaseDate: string;
    startYear: number;
    endYear: number | null;
    runtimeMinutes: number;
    genres: string[];
    interests: string[];
    countriesOfOrigin: string[];
    externalLinks: string | null;
    spokenLanguages: string[];
    filmingLocations: string[];
    productionCompanies: IMDBProductionCompany[];
    budget: number | null;
    grossWorldwide: number | null;
    averageRating: number;
    numVotes: number;
    metascore: number;
}
