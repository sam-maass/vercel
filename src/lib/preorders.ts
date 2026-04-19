import { Redis } from "@upstash/redis";

export type Preorder = {
  email: string;
  kg: number;
  createdAt: string;
};

const KEY = "preorders";

const redis = Redis.fromEnv();

export async function readPreorders(): Promise<Preorder[]> {
  const items = await redis.lrange<Preorder>(KEY, 0, -1);
  return items;
}

export async function addPreorder(entry: Preorder): Promise<void> {
  await redis.rpush(KEY, entry);
}

export async function totalKg(): Promise<number> {
  const all = await readPreorders();
  return all.reduce((sum, p) => sum + p.kg, 0);
}
