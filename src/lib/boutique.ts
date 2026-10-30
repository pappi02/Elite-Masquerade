/** Boutique catalogue. Sample items and prices until the client sends stock. */

export type ProductCategory = "Masks" | "Black tie" | "Western" | "Accessories";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  sizes?: string[];
  /** Short colour words used to draw the placeholder art. */
  palette: [string, string];
  /** Hire instead of buy (tuxedos). */
  hire?: boolean;
};

export const products: Product[] = [
  {
    slug: "gilded-venetian-mask",
    name: "Gilded Venetian Mask",
    category: "Masks",
    price: 6_500,
    description: "Hand-painted papier-mâché with gold filigree and a ruby crystal at the brow. Silk ties.",
    palette: ["#c9a14a", "#8e0f1d"],
  },
  {
    slug: "onyx-half-mask",
    name: "Onyx Half Mask",
    category: "Masks",
    price: 3_500,
    description: "Matte black half mask with a gold trim. Leaves the mouth free for tasting nights.",
    palette: ["#17110f", "#c9a14a"],
  },
  {
    slug: "crimson-feather-mask",
    name: "Crimson Feather Mask",
    category: "Masks",
    price: 9_000,
    description: "Full mask crowned with red and black ostrich feathers. Our most photographed piece.",
    palette: ["#8e0f1d", "#070605"],
  },
  {
    slug: "midnight-tuxedo",
    name: "Midnight Tuxedo",
    category: "Black tie",
    price: 12_000,
    hire: true,
    description: "Tailored black tuxedo with satin lapels, hired for the night and collected on Monday.",
    sizes: ["46", "48", "50", "52", "54", "56"],
    palette: ["#0d0a09", "#efe6d4"],
  },
  {
    slug: "velvet-dinner-jacket",
    name: "Velvet Dinner Jacket",
    category: "Black tie",
    price: 18_000,
    hire: true,
    description: "Burgundy velvet with black shawl lapels. Hire for the night.",
    sizes: ["46", "48", "50", "52", "54"],
    palette: ["#5c0a14", "#0d0a09"],
  },
  {
    slug: "velvet-bow-tie",
    name: "Velvet Bow Tie",
    category: "Accessories",
    price: 2_500,
    description: "Self-tie bow tie in black or oxblood velvet.",
    palette: ["#5c0a14", "#c9a14a"],
  },
  {
    slug: "silk-pocket-square",
    name: "Silk Pocket Square",
    category: "Accessories",
    price: 1_800,
    description: "Hand-rolled silk with a gold masquerade print.",
    palette: ["#c9a14a", "#5c0a14"],
  },
  {
    slug: "stetson-hat",
    name: "Cattleman Hat",
    category: "Western",
    price: 7_500,
    description: "Black felt cattleman hat with a leather band.",
    sizes: ["S", "M", "L", "XL"],
    palette: ["#17110f", "#8f6b26"],
  },
  {
    slug: "leather-cowboy-boots",
    name: "Leather Cowboy Boots",
    category: "Western",
    price: 16_000,
    description: "Hand-stitched brown leather boots with a stacked heel.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    palette: ["#5a3418", "#c9a14a"],
  },
  {
    slug: "silk-bandana",
    name: "Silk Bandana",
    category: "Western",
    price: 1_500,
    description: "Oxblood silk bandana with a paisley print.",
    palette: ["#8e0f1d", "#efe6d4"],
  },
];

export const productCategories: ProductCategory[] = ["Masks", "Black tie", "Western", "Accessories"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const deliveryNote = "Delivered in Nairobi within 48 hours, or waiting for you at the door on the night.";
