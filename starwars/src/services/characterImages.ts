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
 * Generates alternative character portrait URLs found on the internet
 * (Akabab Wookieepedia database, Star Wars character image pool, sci-fi character portraits).
 * Replaces generic random Picsum landscape photos with actual character images.
 */
export function getRandomPicsumUrl(
  characterName: string,
  id: string,
  seedOffset: number = 0,
  attachedImage?: string
): string {
  const cleanId = parseInt(id, 10);
  const validId = !isNaN(cleanId) && cleanId > 0 ? cleanId : 1;
  const cleanName = (characterName || 'character').trim();

  // Primary alternate: Use attached Akabab Wookieepedia character image if available
  if (seedOffset === 0 && attachedImage && attachedImage.startsWith('http') && !attachedImage.includes('starwars-visualguide.com')) {
    return attachedImage;
  }

  // Secondary alternate: Select a character portrait from the Star Wars Visual Guide pool
  if (seedOffset % 2 === 1) {
    const altCharacterId = ((validId + seedOffset * 7 + 3) % 87) + 1;
    return `https://starwars-visualguide.com/assets/img/characters/${altCharacterId}.jpg`;
  }

  // Tertiary alternate: Sci-Fi / alien character avatar portrait from Robohash
  return `https://robohash.org/${encodeURIComponent(cleanName + '-' + seedOffset)}.png?set=set2&bgset=bg2&size=400x500`;
}

/**
 * Resolves character portrait image based on selected image mode.
 */
export function resolveCharacterImageUrl(
  personOrName: Person | string,
  id: string,
  mode: ImageMode = 'official',
  refreshKey: number = 0
): string {
  const name = typeof personOrName === 'string' ? personOrName : personOrName.name;
  const attachedImage = typeof personOrName === 'object' && personOrName ? personOrName.image : undefined;

  if (mode === 'official') {
    return getOfficialPortraitUrl(id);
  }

  return getRandomPicsumUrl(name, id, refreshKey, attachedImage);
}
