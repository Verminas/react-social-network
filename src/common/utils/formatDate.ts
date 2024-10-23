export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  return date.toLocaleDateString("en-US", options);
}
