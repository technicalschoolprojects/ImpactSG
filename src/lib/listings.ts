import catalog from "@/data/listings.json";

export const categories = ["Phones", "Computers", "Audio", "Cameras", "Gaming", "Accessories"] as const;
export const conditions = ["Like new", "Good", "Fair"] as const;

export type Category = (typeof categories)[number];
export type Condition = (typeof conditions)[number];

export interface Listing {
  id: string;
  title: string;
  price: number;
  category: Category;
  description: string;
  notes: string;
  image: string;
  sellerName: string;
  condition: Condition;
}

function isListing(value: unknown): value is Listing {
  if (typeof value !== "object" || value === null) return false;
  const listing = value as Record<string, unknown>;
  return (
    typeof listing.id === "string" &&
    typeof listing.title === "string" &&
    typeof listing.price === "number" &&
    categories.includes(listing.category as Category) &&
    typeof listing.description === "string" &&
    typeof listing.notes === "string" &&
    typeof listing.image === "string" &&
    typeof listing.sellerName === "string" &&
    conditions.includes(listing.condition as Condition)
  );
}

function validateCatalog(data: unknown): Listing[] {
  if (!Array.isArray(data) || !data.every(isListing)) {
    throw new Error("The listing catalog has an invalid entry.");
  }
  return data;
}

export const listings = validateCatalog(catalog);

export function getListingById(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0,
  }).format(price);
}
