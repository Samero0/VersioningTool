export const formatDate = (date: Date | null): string | null => {
  // devuelve la fecha como "YYYY-MM-DD"
  if (!date) return null;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
