// Comprehensive Star Wars character high-resolution image dictionary
// Sourced from Wookieepedia & Akabab Star Wars Character Database
const CHARACTER_IMAGE_MAP: Record<string, string> = {
  'luke skywalker': 'https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg',
  'c-3po': 'https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png',
  'r2-d2': 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/Artoo-fathead.png',
  'darth vader': 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Darth_Vader.png',
  'leia organa': 'https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png',
  'owen lars': 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenLarsHS-SWE.png',
  'beru whitesun lars': 'https://vignette.wikia.nocookie.net/starwars/images/c/cc/BeruCardTrader.png',
  'r5-d4': 'https://vignette.wikia.nocookie.net/starwars/images/c/cb/R5-D4_side_canon.png',
  'biggs darklighter': 'https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsD2.png',
  'obi-wan kenobi': 'https://vignette.wikia.nocookie.net/starwars/images/4/4e/Obi-Wan_Kenobi_RotS.png',
  'anakin skywalker': 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png',
  'wilhuff tarkin': 'https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkin-SWE.png',
  'chewbacca': 'https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png',
  'han solo': 'https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFA_Han_Solo.png',
  'greedo': 'https://vignette.wikia.nocookie.net/starwars/images/c/c6/Greedo.png',
  'jabba desilijic tiure': 'https://vignette.wikia.nocookie.net/starwars/images/7/7f/Jabba_SWR.png',
  'wedge antilles': 'https://vignette.wikia.nocookie.net/starwars/images/6/60/WedgeAntilles-SWE.png',
  'jek tono porkins': 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/JekPorkins-DB.png',
  'yoda': 'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
  'palpatine': 'https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png',
  'boba fett': 'https://vignette.wikia.nocookie.net/starwars/images/7/79/Boba_Fett_HS_Fathead.png',
  'ig-88': 'https://vignette.wikia.nocookie.net/starwars/images/f/f2/IG-88.png',
  'bossk': 'https://vignette.wikia.nocookie.net/starwars/images/1/1d/Bossk-SWE.png',
  'lando calrissian': 'https://vignette.wikia.nocookie.net/starwars/images/8/8f/Lando_BF2.png',
  'lobot': 'https://vignette.wikia.nocookie.net/starwars/images/9/96/Lobot-DB.png',
  'ackbar': 'https://vignette.wikia.nocookie.net/starwars/images/2/29/Admiral_Ackbar_RH.png',
  'mon mothma': 'https://vignette.wikia.nocookie.net/starwars/images/b/b7/MP-MonMothma.png',
  'arvel crynyd': 'https://vignette.wikia.nocookie.net/starwars/images/d/de/Arvel-crynyd.png',
  'wicket systri warrick': 'https://vignette.wikia.nocookie.net/starwars/images/4/4f/Wicket_rotj.png',
  'nien nunb': 'https://vignette.wikia.nocookie.net/starwars/images/1/14/NienNunbHS-SWE.png',
  'qui-gon jinn': 'https://vignette.wikia.nocookie.net/starwars/images/f/f6/Qui-Gon_Jinn_Headshot.png',
  'nute gunray': 'https://vignette.wikia.nocookie.net/starwars/images/f/fd/Nute_Gunray_SWE.png',
  'finis valorum': 'https://vignette.wikia.nocookie.net/starwars/images/5/51/ValorumSWE.png',
  'padmé amidala': 'https://vignette.wikia.nocookie.net/starwars/images/b/b2/Padme_Amidala_AOTC.png',
  'jar jar binks': 'https://vignette.wikia.nocookie.net/starwars/images/d/d2/Jar_Jar_aotc.png',
  'roos tarpals': 'https://vignette.wikia.nocookie.net/starwars/images/c/ca/Roos_Tarpals.png',
  'rugor nass': 'https://vignette.wikia.nocookie.net/starwars/images/d/d8/BossNass-DB.png',
  'ric olié': 'https://vignette.wikia.nocookie.net/starwars/images/4/4c/RicOlieHS-SWE.png',
  'watto': 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/Watto_HS.png',
  'sebulba': 'https://vignette.wikia.nocookie.net/starwars/images/1/14/Sebulba_Full_Body.png',
  'quarsh panaka': 'https://vignette.wikia.nocookie.net/starwars/images/7/72/Panakahead.png',
  'shmi skywalker': 'https://vignette.wikia.nocookie.net/starwars/images/a/ad/ShmiSkywalker-DB.png',
  'darth maul': 'https://vignette.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png',
  'aayla secura': 'https://vignette.wikia.nocookie.net/starwars/images/f/f9/Aayla_Secura_SWE.png',
  'mace windu': 'https://vignette.wikia.nocookie.net/starwars/images/5/58/Mace_Windu_BF2.png',
  'ki-adi-mundi': 'https://vignette.wikia.nocookie.net/starwars/images/9/9e/KiAdiMundi-SWE.png',
  'kit fisto': 'https://vignette.wikia.nocookie.net/starwars/images/4/4c/KitFisto-SWE.png',
  'eeth koth': 'https://vignette.wikia.nocookie.net/starwars/images/4/4e/EethKoth-SWE.png',
  'adi gallia': 'https://vignette.wikia.nocookie.net/starwars/images/b/ba/AdiGallia-SWE.png',
  'saesee tiin': 'https://vignette.wikia.nocookie.net/starwars/images/6/68/SaeseeTiin-SWE.png',
  'yarael poof': 'https://vignette.wikia.nocookie.net/starwars/images/6/66/YaraelPoof-SWE.png',
  'plo koon': 'https://vignette.wikia.nocookie.net/starwars/images/b/bf/PloKoon-SWE.png',
  'mas amedda': 'https://vignette.wikia.nocookie.net/starwars/images/3/37/Mas_Amedda_SWE.png',
  'gregar typho': 'https://vignette.wikia.nocookie.net/starwars/images/5/52/Gregar_Typho.png',
  'cordé': 'https://vignette.wikia.nocookie.net/starwars/images/b/b6/Corde-DB.png',
  'cliegg lars': 'https://vignette.wikia.nocookie.net/starwars/images/3/36/ClieggLarsHS-SWE.png',
  'poggle the lesser': 'https://vignette.wikia.nocookie.net/starwars/images/9/93/Poggle_SWE.png',
  'luminara unduli': 'https://vignette.wikia.nocookie.net/starwars/images/2/21/LuminaraUnduli-SWE.png',
  'barriss offee': 'https://vignette.wikia.nocookie.net/starwars/images/3/37/BarrissOffeeSWE.png',
  'dormé': 'https://vignette.wikia.nocookie.net/starwars/images/1/18/Dorme-SWE.png',
  'dooku': 'https://vignette.wikia.nocookie.net/starwars/images/b/b8/Dooku_Headshot.png',
  'bail prestor organa': 'https://vignette.wikia.nocookie.net/starwars/images/5/50/BailOrgana-SWE.png',
  'jango fett': 'https://vignette.wikia.nocookie.net/starwars/images/5/56/JangoFett-SWE.png',
  'zam wesell': 'https://vignette.wikia.nocookie.net/starwars/images/7/7d/Clawdite.png',
  'dexter jettster': 'https://vignette.wikia.nocookie.net/starwars/images/6/6c/DexterJettster-SWE.png',
  'lama su': 'https://vignette.wikia.nocookie.net/starwars/images/7/73/Lama_Su.png',
  'taun we': 'https://vignette.wikia.nocookie.net/starwars/images/9/9c/TaunWe-SWE.png',
  'jocasta nu': 'https://vignette.wikia.nocookie.net/starwars/images/1/15/Jocasta_Nu_SWE.png',
  'r4-p17': 'https://vignette.wikia.nocookie.net/starwars/images/6/6b/R4-P17.png',
  'wat tambor': 'https://vignette.wikia.nocookie.net/starwars/images/a/a5/Wat_Tambor.png',
  'san hill': 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/SanHill_HS.png',
  'shaak ti': 'https://vignette.wikia.nocookie.net/starwars/images/2/20/Shaak_Ti_SWE.png',
  'grievous': 'https://vignette.wikia.nocookie.net/starwars/images/d/de/Grievous_headshot.png',
  'tarfful': 'https://vignette.wikia.nocookie.net/starwars/images/3/37/Tarfful_SWE.png',
  'raymus antilles': 'https://vignette.wikia.nocookie.net/starwars/images/8/80/Raymus_card_trader.png',
  'tion medon': 'https://vignette.wikia.nocookie.net/starwars/images/4/43/Tion_Medon.png'
};

// Dynamic remote dictionary cache for Akabab API
let dynamicAkababMap: Record<string, string> | null = null;

export async function loadAkababImagesMap(): Promise<Record<string, string>> {
  if (dynamicAkababMap) return dynamicAkababMap;
  try {
    const res = await fetch('https://akabab.github.io/starwars-api/api/all.json');
    if (!res.ok) throw new Error('Akabab API offline');
    const data = await res.json();
    const map: Record<string, string> = {};
    if (Array.isArray(data)) {
      data.forEach((char: { name?: string; image?: string }) => {
        if (char.name && char.image) {
          map[char.name.trim().toLowerCase()] = char.image;
        }
      });
    }
    dynamicAkababMap = map;
    return map;
  } catch (err) {
    console.warn('Could not fetch dynamic Akabab Star Wars images, using static dictionary:', err);
    dynamicAkababMap = CHARACTER_IMAGE_MAP;
    return CHARACTER_IMAGE_MAP;
  }
}

export function getCuratedCharacterImageUrl(characterName: string, id: string): string {
  if (!characterName) return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  
  const key = characterName.trim().toLowerCase();
  
  // 1. Check curated Wookieepedia dictionary
  if (CHARACTER_IMAGE_MAP[key]) {
    return CHARACTER_IMAGE_MAP[key];
  }

  // 2. Check dynamic Akabab cache
  if (dynamicAkababMap && dynamicAkababMap[key]) {
    return dynamicAkababMap[key];
  }

  // 3. Fallback to Star Wars Visual Guide API
  if (id && !isNaN(parseInt(id, 10))) {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  }

  // 4. Fallback to Picsum seeded portrait
  const seed = `${id}-${key.replace(/[^a-z0-9]/g, '')}`;
  return `https://picsum.photos/seed/${seed}/400/500`;
}
