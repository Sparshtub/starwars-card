import type { Person } from '../types/starwars';

export type ImageMode = 'picsum' | 'official';

/**
 * Generates an official Star Wars Visual Guide 400x500 portrait URL for SWAPI character ID.
 */
export function getOfficialPortraitUrl(id: string): string {
  if (id && !isNaN(parseInt(id, 10)) && parseInt(id, 10) <= 87) {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }
  return `https://starwars-visualguide.com/assets/img/characters/1.jpg`;
}

/**
 * Generates a fresh random picture from Picsum Photos per character.
 * Appends a timestamp / refresh seed so every refresh generates a new image.
 */
export function getRandomPicsumUrl(characterName: string, id: string, seedOffset: number = 0): string {
  const cleanName = (characterName || 'character').toLowerCase().replace(/[^a-z0-9]/g, '');
  const timestamp = Math.floor(Date.now() / 10000);
  const seed = `${id}-${cleanName}-${timestamp}-${seedOffset}`;
  return `https://picsum.photos/seed/${seed}/400/500`;
}

/**
 * Resolves character portrait image based on selected image mode.
 * Uses character object's attached Akabab image if available.
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
    if (attachedImage) {
      return attachedImage;
    }
    return getOfficialPortraitUrl(id);
  }
  return getRandomPicsumUrl(name, id, refreshKey);
}
