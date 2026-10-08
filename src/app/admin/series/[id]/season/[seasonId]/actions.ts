'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';

export async function createEpisode(
    seasonId: string,
    mediaId: string,
    formData: FormData,
) {
    const number = Number(formData.get('number'));
    const title = String(formData.get('title') ?? '').trim();
    const telegramMessageIdValue = String(
        formData.get('telegramMessageId') ?? '',
    ).trim();

    let telegramMessageId: number | null = null;

    if (telegramMessageIdValue) {
        const value = Number(telegramMessageIdValue);

        if (!Number.isInteger(value) || value < 1) {
            throw new Error('Некорректный Telegram message ID');
        }

        telegramMessageId = value;
    }

    if (!Number.isInteger(number) || number < 1) {
        throw new Error('Некорректный номер эпизода');
    }

    if (!title) {
        throw new Error('Введите название эпизода');
    }

    try {
        await db.episode.create({
            data: {
                number,
                title,
                telegramMessageId,
                seasonId,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            throw new Error(`Эпизод ${number} уже существует`);
        }

        throw error;
    }

    revalidatePath(`/admin/series/${mediaId}/season/${seasonId}`);
}
