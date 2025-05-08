export const formatTime = (duration: number) => {
    if (duration > 3600) {
        return `${Math.floor(duration / 3600)}:${String(Math.floor((duration % 3600) / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`;
    }
    return `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")}`;
}

export const formatDate = (dateStr: string): string | null => {
    const [day, month, year] = dateStr.split('/').map(Number);

  if (!day || !month || !year) return null;

  const paddedDay = day.toString().padStart(2, '0');
  const paddedMonth = month.toString().padStart(2, '0');

  return `${paddedDay} Th${paddedMonth} ${year}`;
}

