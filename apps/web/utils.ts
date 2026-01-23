export function parseDescription(description: string[] | undefined, fallback: string): string[] {
  if (!description) return [fallback]

  // If it's already an array, return it
  if (Array.isArray(description)) return description

  // Otherwise, return as single paragraph
  return [description]
}
