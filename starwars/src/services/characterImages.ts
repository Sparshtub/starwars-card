import type { Person } from '../types/starwars';

export type ImageMode = 'picsum' | 'official' | 'alternate';

/**
 * Generates an official Star Wars Visual Guide 400x500 portrait URL for SWAPI character ID.
 */
export function getOfficialPortraitUrl(id: string): string {
  const cleanId = id ? id.trim() : '1';
  return `https://starwars-visualguide.com/assets/img/characters/${cleanId || '1'}.jpg`;
}

/**
 * Generates unique, deterministic Picsum character photos (https://picsum.photos/seed/{id}/400/500)
 * per character SWAPI ID as specified in the assignment prompt.
 * If seedOffset > 0 (user clicks Refresh Pics), appends seedOffset to produce fresh new photos.
 */
export function getRandomPicsumUrl(
  _characterName: string,
  id: string,
  seedOffset: number = 0
): string {
  const cleanId = parseInt(id, 10);
  const validId = !isNaN(cleanId) && cleanId > 0 ? cleanId : 1;
  const seedKey = seedOffset > 0 ? `${validId}-${seedOffset}` : `${validId}`;
  return `https://picsum.photos/seed/${seedKey}/400/500`;
}

/**
 * Resolves character portrait image based on selected image mode.
 */
export function resolveCharacterImageUrl(
  personOrName: Person | string,
  id: string,
  mode: ImageMode = 'picsum',
  refreshKey: number = 0
): string {
  const name = typeof personOrName === 'string' ? personOrName : personOrName.name;

  if (mode === 'official') {
    return getOfficialPortraitUrl(id);
  }

  return getRandomPicsumUrl(name, id, refreshKey);
}
