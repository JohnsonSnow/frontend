import { games } from "./data/games";

export type GameFilters = {
    search?: string;
}

export const fetchGames = async (options?: GameFilters) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredGames = games;

    if(options?.search) {
        filteredGames = filteredGames.filter((games) => {
            return games.title.toLowerCase().includes(options.search!.toLowerCase()) 
            || games.slug.toLowerCase().includes(options.search!.toLowerCase())
            || games.providerName.toLowerCase().includes(options.search!.toLowerCase());
        })
    }

    return filteredGames;
}