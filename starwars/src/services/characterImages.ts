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
  const timestamp = Math.floor(Date.now() / 10000); // changes periodically
  const seed = `${id}-${cleanName}-${timestamp}-${seedOffset}`;
  return `https://picsum.photos/seed/${seed}/400/500`;
}

/**
 * Resolves character portrait image based on selected image mode.
 */
export function resolveCharacterImageUrl(
  characterName: string,
  id: string,
  mode: ImageMode = 'picsum',
  refreshKey: number = 0
): string {
  if (mode === 'official') {
    return getOfficialPortraitUrl(id);
  }
  return getRandomPicsumUrl(characterName, id, refreshKey);
}
