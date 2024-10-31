export const truncateText = (text: String, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};