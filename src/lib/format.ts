export function formatDateRange(start: string, end?: string) {
  return end && end.trim().length > 0 ? `${start} – ${end}` : `${start} – Present`
}

export function commaList(items: string[]) {
  return items.join(', ')
}
