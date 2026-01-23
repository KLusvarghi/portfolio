import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProjectDate(
  startDate: string,
  endDate: string | null
): string {
  const startYear = startDate.split("-")[0];

  if (!endDate) {
    return `${startYear} - Atual`;
  }

  const endYear = endDate.split("-")[0];

  if (startYear === endYear) {
    return startYear;
  }

  return `${startYear} - ${endYear}`;
}
