const EPISODE_FILE_NAME_REGEX = /^([a-z0-9-]+)-s(\d{2})e(\d{2})\.[^.]+$/i;

export interface EpisodeFileName {
    slug: string;
    seasonNumber: number;
    episodeNumber: number;
}

export function parseEpisodeFileName(fileName: string): EpisodeFileName | null {
    const match = fileName.trim().match(EPISODE_FILE_NAME_REGEX);

    if (!match) return null;

    const seasonNumber = Number(match[2]);
    const episodeNumber = Number(match[3]);

    if (seasonNumber < 1 || episodeNumber < 1) {
        return null;
    }

    return {
        slug: match[1].toLowerCase(),
        seasonNumber,
        episodeNumber,
    };
}
