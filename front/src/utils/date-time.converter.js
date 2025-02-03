export const toStartTime = (date) => {
    if (!date) {
        throw new Error('Unable to convert toStartTime: missing date');
    }

    const value = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }).format(value);
}

export const toDuration = (duration) => {
    if (!duration) {
        return '';
    }

    const ms = typeof duration === 'string' ? Number(duration) : duration;
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}