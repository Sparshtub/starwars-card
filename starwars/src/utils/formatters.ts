import { 
  getCharacterImageUrl as resolveCharacterImageUrl, 
  getAkababGitHubImageUrl, 
  getPicsumPortraitUrl 
} from '../services/characterImages';

/**
 * Formats height from centimeters to meters with 2 decimal places.
 * Example: "172" -> "1.72 m", "unknown" -> "Unknown"
 */
export function formatHeight(heightCm: string): string {
  if (!heightCm || heightCm.toLowerCase() === 'unknown' || heightCm === 'none') {
    return 'Unknown';
  }
  const cm = parseFloat(heightCm.replace(/,/g, ''));
  if (isNaN(cm)) return heightCm;
  const meters = (cm / 100).toFixed(2);
  return `${meters} m`;
}

/**
 * Formats mass with 'kg' suffix.
 * Example: "77" -> "77 kg", "unknown" -> "Unknown"
 */
export function formatMass(massKg: string): string {
  if (!massKg || massKg.toLowerCase() === 'unknown' || massKg === 'none') {
    return 'Unknown';
  }
  const mass = massKg.replace(/,/g, '');
  if (isNaN(parseFloat(mass))) return massKg;
  return `${mass} kg`;
}

/**
 * Formats an ISO date string into dd-MM-yyyy format as requested in the spec.
 * Example: "2014-12-09T13:50:51.644000Z" -> "09-12-2014"
 */
export function formatDate(isoString: string): string {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch {
    return isoString;
  }
}

/**
 * Formats population strings into localized comma-separated numbers or returns clean status.
 * Example: "2000000000" -> "2,000,000,000"
 */
export function formatPopulation(pop: string): string {
  if (!pop || pop.toLowerCase() === 'unknown' || pop.toLowerCase() === 'n/a') {
    return 'Unknown';
  }
  const num = parseInt(pop.replace(/,/g, ''), 10);
  if (isNaN(num)) return pop;
  return num.toLocaleString('en-US');
}

/**
 * Extracts numeric ID from SWAPI URL (e.g., "https://swapi.py4e.com/api/people/1/" -> "1")
 */
export function extractIdFromUrl(url: string): string {
  if (!url) return '1';
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? matches[1] : '1';
}

export function getAkababFallbackUrl(characterName: string): string {
  return getAkababGitHubImageUrl(characterName);
}

export function getPicsumImageUrl(characterName: string, id: string, refreshKey: number = 0): string {
  return getPicsumPortraitUrl(characterName, id, refreshKey);
}

/**
 * Combined character portrait image resolver matching card 4:5 aspect ratio.
 */
export function getCharacterImageUrl(characterName: string, id: string): string {
  return resolveCharacterImageUrl(characterName, id);
}
