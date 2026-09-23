import type { Store, StoreId } from "./types.ts";

export const stores: Record<StoreId, Store> = {
  barbershop: { id: "barbershop", name: "Barbershop", domain: "barbershop.no" },
  proshop: { id: "proshop", name: "Proshop", domain: "proshop.no" },
};
