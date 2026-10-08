export const TELEGRAM_ARCHIVE_ID = '4297317345';

export function getTelegramMessageUrl(messageId: number) {
    return `https://t.me/c/${TELEGRAM_ARCHIVE_ID}/${messageId}`;
}
