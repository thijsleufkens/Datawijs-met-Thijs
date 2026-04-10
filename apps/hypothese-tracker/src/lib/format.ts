const maanden = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

export function formatDatum(datum: string | Date): string {
  const d = new Date(datum);
  return `${d.getDate()} ${maanden[d.getMonth()]} ${d.getFullYear()}`;
}

export function dagenVerschil(datum: string | Date): number {
  const d = new Date(datum);
  const nu = new Date();
  d.setHours(0, 0, 0, 0);
  nu.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - nu.getTime()) / (1000 * 60 * 60 * 24));
}
