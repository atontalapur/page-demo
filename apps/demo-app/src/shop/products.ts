import type { Queryable } from '../db/index.ts';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  stock: number;
}

const columns = `id, slug, name, description, price_cents as "priceCents", stock`;

export async function listProducts(db: Queryable): Promise<Product[]> {
  const { rows } = await db.query<Product>(`select ${columns} from products order by name`);
  return rows;
}

/** Finds a product by slug, or by id, so /products/<id> URLs resolve too. */
export async function getProduct(db: Queryable, slugOrId: string): Promise<Product | null> {
  const { rows } = await db.query<Product>(
    `select ${columns} from products where id = $1 or slug = $1`,
    [slugOrId],
  );
  return rows[0] ?? null;
}
