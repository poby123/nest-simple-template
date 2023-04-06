import ms from 'ms';

export const addTime = (time: string): Date => {
    const currentTimeMs = Date.now();
    const adjustedTimeMs = currentTimeMs + ms(time);
    const adjustedDate = new Date(adjustedTimeMs);

    return adjustedDate;
}

export const toMilliSeconds = (time: string): number => {
    return ms(time);
}

export const toSeconds = (time: string): number => {
    return Number(ms(time) / 1000);
}