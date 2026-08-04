/**
 * Converts a character name to a clean url slug.
 * Example: "Luke Skywalker" -> "luke-skywalker"
 */
export function getCharacterSlug(name: string): string {
  if (!name) return 'character';
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * 1. Primary: Star Wars Visual Guide 400x500 (4:5 aspect ratio) portrait endpoint.
 */
export function getVisualGuideImageUrl(id: string): string {
  if (id && !isNaN(parseInt(id, 10))) {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }
  return `https://starwars-visualguide.com/assets/img/characters/1.jpg`;
}

/**
 * 2. Secondary: Akabab Star Wars API GitHub CDN portrait repository.
 */
export function getAkababGitHubImageUrl(characterName: string): string {
  const slug = getCharacterSlug(characterName);
  return `https://raw.githubusercontent.com/akabab/starwars-api/master/api/images/${slug}.jpg`;
}

/**
 * 3. Tertiary: Picsum 400x500 (4:5 aspect ratio) seeded portrait fallback.
 */
export function getPicsumPortraitUrl(characterName: string, id: string, refreshKey: number = 0): string {
  const seed = `${id}-${getCharacterSlug(characterName)}${refreshKey > 0 ? `-${refreshKey}` : ''}`;
  return `https://picsum.photos/seed/${seed}/400/500`;
}

/**
 * Resolves the initial optimal 4:5 aspect ratio character portrait URL.
 */
export function getCharacterImageUrl(characterName: string, id: string): string {
  if (id && !isNaN(parseInt(id, 10)) && parseInt(id, 10) <= 87) {
    return getVisualGuideImageUrl(id);
  }
  return getAkababGitHubImageUrl(characterName);
}
