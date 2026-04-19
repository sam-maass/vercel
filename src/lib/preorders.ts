import { promises as fs } from "fs";
import path from "path";

export type Preorder = {
  email: string;
  kg: number;
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "preorders.json");

async function ensureFile() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

export async function readPreorders(): Promise<Preorder[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as Preorder[];
}

export async function addPreorder(entry: Preorder): Promise<void> {
  const all = await readPreorders();
  all.push(entry);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf8");
}

export async function totalKg(): Promise<number> {
  const all = await readPreorders();
  return all.reduce((sum, p) => sum + p.kg, 0);
}
