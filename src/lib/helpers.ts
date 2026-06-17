const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Recife",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const formatTime = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Recife",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const formatDate = (iso: string) => {
  // Date-only strings (YYYY-MM-DD) are parsed as UTC by spec, causing a day
  // shift when converted to negative-offset timezones. Force local noon instead.
  const date = iso.includes("T") ? new Date(iso) : new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Recife",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export { currency, formatDateTime, formatTime, formatDate };
