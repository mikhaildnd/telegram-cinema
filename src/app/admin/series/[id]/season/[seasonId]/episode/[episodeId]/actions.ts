'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';

export async function updateEpisode(
    episodeId: string,
    mediaId: string,
    seasonId: string,
    formData: FormData,
) {
    const number = Number(formData.get('number'));
    const title = String(formData.get('title') ?? '').trim();
    const telegramMessageIdValue = String(
        formData.get('telegramMessageId') ?? '',
    ).trim();

    if (!Number.isInteger(number) || number < 1) {
        throw new Error('Некорректный номер эпизода');
    }

    if (!title) {
        throw new Error('Введите название эпизода');
    }

    let telegramMessageId: number | null = null;

    if (telegramMessageIdValue) {
        const value = Number(telegramMessageIdValue);

        if (!Number.isInteger(value) || value < 1) {
            throw new Error('Некорректный Telegram message ID');
        }

        telegramMessageId = value;
    }

    try {
        await db.episode.update({
            where: {
                id: episodeId,
            },
            data: {
                number,
                title,
                telegramMessageId,
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
    redirect(`/admin/series/${mediaId}/season/${seasonId}`);
}

export async function deleteEpisode(
    episodeId: string,
    mediaId: string,
    seasonId: string,
) {
    await db.episode.delete({
        where: {
            id: episodeId,
        },
    });

    revalidatePath(`/admin/series/${mediaId}/season/${seasonId}`);
    redirect(`/admin/series/${mediaId}/season/${seasonId}`);
}
