/** Rob Run cheat gameplay screenshots — every entry includes alt text. */

export interface GameplayImage {
  id: string;
  src: string;
  /** Blog cover / card path (same asset under /images/blog). */
  blogSrc: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

const blog = '/images/blog';

export const gameplayImages = {
  espRadar: {
    id: 'espRadar',
    src: `${blog}/esp-skeleton.webp`,
    blogSrc: `${blog}/esp-skeleton.webp`,
    alt: 'ROB RUN skeletal ESP and red player boxes with distance and weapon tags through indoor pillars',
    caption: 'Skeleton ESP',
    captionDesc: 'Players through walls with bone overlays and distance tags.',
  },
  vehicleEsp: {
    id: 'vehicleEsp',
    src: `${blog}/esp-vehicles.webp`,
    blogSrc: `${blog}/esp-vehicles.webp`,
    alt: 'ROB RUN vehicle ESP with yellow 3D boxes, nameplates and radar over cars in a western town',
    caption: 'Vehicle ESP',
    captionDesc: 'Car boxes, status tags and ROB RUN radar.',
  },
  combatOverlay: {
    id: 'combatOverlay',
    src: `${blog}/aimbot-bar.webp`,
    blogSrc: `${blog}/aimbot-bar.webp`,
    alt: 'ROB RUN aimbot FOV circle and skeleton ESP locking a robber behind the Reef Bar counter',
    caption: 'Aimbot combat',
    captionDesc: 'Soft aim FOV with bone ESP mid-robbery.',
  },
  aimbotFov: {
    id: 'aimbotFov',
    src: `${blog}/esp-parking.webp`,
    blogSrc: `${blog}/esp-parking.webp`,
    alt: 'ROB RUN ESP boxes and skeletons on players and cars in a desert parking lot with a central aim reticle',
    caption: 'Aim FOV',
    captionDesc: 'Central aim reticle with multi-target ESP outdoors.',
  },
  airEsp: {
    id: 'airEsp',
    src: `${blog}/esp-heist.webp`,
    blogSrc: `${blog}/esp-heist.webp`,
    alt: 'ROB RUN heist ESP showing robber outlines, weapons and distances through a blue business building doorway',
    caption: 'Heist ESP',
    captionDesc: 'Robber wallhack during a store robbery.',
  },
  groundEsp: {
    id: 'groundEsp',
    src: `${blog}/esp-coast-cops.webp`,
    blogSrc: `${blog}/esp-coast-cops.webp`,
    alt: 'ROB RUN aimbot FOV and ESP boxes on police cars along a sunny coastal road with a Ferris wheel behind',
    caption: 'Police ESP',
    captionDesc: 'Police vehicle ESP near the boardwalk.',
  },
  mapRadar: {
    id: 'mapRadar',
    src: `${blog}/esp-radar-town.webp`,
    blogSrc: `${blog}/esp-radar-town.webp`,
    alt: 'ROB RUN radar and vehicle ESP boxes on a hatchback outside a storefront in town',
    caption: 'Radar + cars',
    captionDesc: 'Custom radar with vehicle bounding boxes.',
  },
  hackResults: {
    id: 'hackResults',
    src: `${blog}/esp-storefront.webp`,
    blogSrc: `${blog}/esp-storefront.webp`,
    alt: 'ROB RUN player ESP boxes and nameplates on robbers inside a storefront viewed from a getaway hatchback',
    caption: 'Storefront ESP',
    captionDesc: 'Player boxes and weapon tags through glass.',
  },
  menuVisuals: {
    id: 'menuVisuals',
    src: `${blog}/menu-visuals.webp`,
    blogSrc: `${blog}/menu-visuals.webp`,
    alt: 'ROB RUN cheat menu open on Visuals with player ESP toggles and a live desert street behind the overlay',
    caption: 'Visuals menu',
    captionDesc: 'ESP module toggles in the cheat menu.',
  },
  menuWorld: {
    id: 'menuWorld',
    src: `${blog}/esp-loot.webp`,
    blogSrc: `${blog}/esp-loot.webp`,
    alt: 'ROB RUN loot ESP labels for phones, cash registers and items with radar in a sunny parking lot',
    caption: 'Loot ESP',
    captionDesc: 'Item tags and distances through walls.',
  },
  menuAimbot: {
    id: 'menuAimbot',
    src: `${blog}/menu-aimbot.webp`,
    blogSrc: `${blog}/menu-aimbot.webp`,
    alt: 'ROB RUN cheat aimbot settings menu beside ESP-highlighted players and a custom radar',
    caption: 'Aimbot menu',
    captionDesc: 'Aim assist options next to live ESP.',
  },
  menuMisc: {
    id: 'menuMisc',
    src: `${blog}/menu-weapon.webp`,
    blogSrc: `${blog}/menu-weapon.webp`,
    alt: 'ROB RUN cheat weapon settings panel with skin changer toggles over desert ESP boxes on vehicles',
    caption: 'Weapon menu',
    captionDesc: 'Weapon behavior and skin changer controls.',
  },
} as const satisfies Record<string, GameplayImage>;

export type GameplayImageId = keyof typeof gameplayImages;

export function getGameplayImage(id: GameplayImageId): GameplayImage {
  return gameplayImages[id];
}

/** Flat list for cycling blog covers. */
export const gameplayImageList = Object.values(gameplayImages);

export const NEW_BLOG_COVERS = [
  `${blog}/esp-skeleton.webp`,
  `${blog}/esp-loot.webp`,
  `${blog}/esp-vehicles.webp`,
  `${blog}/esp-radar-town.webp`,
  `${blog}/esp-jewelry.webp`,
  `${blog}/esp-items.webp`,
  `${blog}/esp-pharmacy.webp`,
  `${blog}/esp-indoor.webp`,
  `${blog}/aimbot-bar.webp`,
  `${blog}/esp-storefront.webp`,
  `${blog}/esp-police.webp`,
  `${blog}/esp-players-indoor.webp`,
  `${blog}/esp-heist.webp`,
  `${blog}/esp-coast-cops.webp`,
  `${blog}/esp-parking.webp`,
  `${blog}/esp-plaza-loot.webp`,
  `${blog}/menu-visuals.webp`,
  `${blog}/menu-weapon.webp`,
  `${blog}/menu-aimbot.webp`,
] as const;

export const NEW_BLOG_ALTS: Record<(typeof NEW_BLOG_COVERS)[number], string> = {
  [`${blog}/esp-skeleton.webp`]:
    'ROB RUN skeletal ESP and red player boxes with distance and weapon tags through indoor pillars',
  [`${blog}/esp-loot.webp`]:
    'ROB RUN loot ESP labels for phones, cash registers and items with radar in a sunny parking lot',
  [`${blog}/esp-vehicles.webp`]:
    'ROB RUN vehicle ESP with yellow 3D boxes, nameplates and radar over cars in a western town',
  [`${blog}/esp-radar-town.webp`]:
    'ROB RUN radar and vehicle ESP boxes on a hatchback outside a storefront in town',
  [`${blog}/esp-jewelry.webp`]:
    'ROB RUN NPC skeleton ESP and jewelry loot tags through a glass storefront with distance readouts',
  [`${blog}/esp-items.webp`]:
    'ROB RUN item ESP highlighting phones, cigars and cash registers behind hedges near a parked hatchback',
  [`${blog}/esp-pharmacy.webp`]:
    'ROB RUN wallhack boxes and pharmacy, phone and cash register loot tags through a patio storefront',
  [`${blog}/esp-indoor.webp`]:
    'ROB RUN indoor wallhack with cyan doorway boxes, loot tags and ROB RUN radar outside a building entrance',
  [`${blog}/aimbot-bar.webp`]:
    'ROB RUN aimbot FOV circle and skeleton ESP locking a robber behind the Reef Bar counter',
  [`${blog}/esp-storefront.webp`]:
    'ROB RUN player ESP boxes and nameplates on robbers inside a storefront viewed from a getaway hatchback',
  [`${blog}/esp-police.webp`]:
    'ROB RUN ESP boxes on a police SUV and skeleton overlay on a nearby cop beside a ROB RUN hatchback',
  [`${blog}/esp-players-indoor.webp`]:
    'ROB RUN red skeleton ESP on multiple criminals with distance and armor tags in a vaulted indoor plaza',
  [`${blog}/esp-heist.webp`]:
    'ROB RUN heist ESP showing robber outlines, weapons and distances through a blue business building doorway',
  [`${blog}/esp-coast-cops.webp`]:
    'ROB RUN aimbot FOV and ESP boxes on police cars along a sunny coastal road with a Ferris wheel behind',
  [`${blog}/esp-parking.webp`]:
    'ROB RUN ESP boxes and skeletons on players and cars in a desert parking lot with a central aim reticle',
  [`${blog}/esp-plaza-loot.webp`]:
    'ROB RUN green loot ESP boxes through a plaza building wall with cash and security item labels',
  [`${blog}/menu-visuals.webp`]:
    'ROB RUN cheat menu open on Visuals with player ESP toggles and a live desert street behind the overlay',
  [`${blog}/menu-weapon.webp`]:
    'ROB RUN cheat weapon settings panel with skin changer toggles over desert ESP boxes on vehicles',
  [`${blog}/menu-aimbot.webp`]:
    'ROB RUN cheat aimbot settings menu beside ESP-highlighted players and a custom radar',
};
