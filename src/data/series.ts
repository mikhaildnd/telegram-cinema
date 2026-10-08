export type Episode = {
    number: number;
    title: string;
    telegramMessageId?: number;
};

export type Season = {
    number: number;
    episodes: Episode[];
};

export type Series = {
    slug: string;
    title: string;
    posterUrl: string;
    description: string;
    seasons: Season[];
};

export const series: Series[] = [
    {
        slug: 'the-pitt',
        title: 'The Pitt',
        posterUrl: '/posters/the-pitt-300x450.webp',
        description:
            'Медицинская драма о врачах и персонале отделения неотложной помощи, которым приходится справляться с напряжёнными сменами и сложными случаями.',
        seasons: [
            {
                number: 1,
                episodes: [
                    { number: 1, title: 'Эпизод 1' },
                    { number: 2, title: 'Эпизод 2' },
                    { number: 3, title: 'Эпизод 3' },
                ],
            },
            {
                number: 2,
                episodes: [
                    { number: 1, title: 'Эпизод 1' },
                    { number: 2, title: 'Эпизод 2' },
                ],
            },
        ],
    },
    {
        slug: 'breaking-bad',
        title: 'Breaking Bad',
        posterUrl: '/posters/breaking-bad-300x450.webp',
        description:
            'Учитель химии после тяжёлого диагноза решает использовать свои знания, чтобы обеспечить семью, и постепенно погружается в криминальный мир.',
        seasons: [
            {
                number: 1,
                episodes: [],
            },
        ],
    },
    {
        slug: 'stranger-things',
        title: 'Stranger Things',
        posterUrl: '/posters/stranger-things-300x450.webp',
        description:
            'После исчезновения мальчика группа друзей сталкивается с загадочными событиями и тайнами маленького американского города.',
        seasons: [
            {
                number: 1,
                episodes: [],
            },
        ],
    },
    {
        slug: 'the-last-of-us',
        title: 'The Last of Us',
        posterUrl: '/posters/the-last-of-us-300x450.webp',
        description:
            'После глобальной катастрофы контрабандист сопровождает девочку через разрушенную Америку, где выживание стало главным законом.',
        seasons: [
            {
                number: 1,
                episodes: [],
            },
        ],
    },
];
