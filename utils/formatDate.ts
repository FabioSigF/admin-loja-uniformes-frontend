export const formatDateToMMM = (dateString: string) => {
  const date = new Date(dateString); // Cria um objeto Date a partir da string
  const day = String(date.getUTCDate()).padStart(2, '0'); // Obtém o dia
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Nomes dos meses
  const month = monthNames[date.getUTCMonth()]; // Obtém o nome do mês
  const year = date.getUTCFullYear(); // Obtém o ano

  return `${day} ${month} ${year}`; // Retorna a data formatada
};