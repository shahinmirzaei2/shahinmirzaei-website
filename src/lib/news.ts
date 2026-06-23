import fs from "fs";
import path from "path";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export interface NewsItem {
  slug: string;
  titleFa: string;
  titleEn: string;
  summaryFa: string;
  bodyFa: string;
  category: string;
  coverImage: string;
  gallery: string[];
  publishedAt: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

function ensureDir() {
  if (!fs.existsSync(NEWS_DIR)) {
    fs.mkdirSync(NEWS_DIR, { recursive: true });
  }
}

export function getAllNews(): NewsItem[] {
  ensureDir();
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(NEWS_DIR, f), "utf-8")) as NewsItem)
    .sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1));
}

export function getPublishedNews(): NewsItem[] {
  return getAllNews().filter((n) => n.status === "published");
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  ensureDir();
  const fp = path.join(NEWS_DIR, `${slug}.json`);
  if (!fs.existsSync(fp)) return undefined;
  return JSON.parse(fs.readFileSync(fp, "utf-8")) as NewsItem;
}

export function saveNews(item: NewsItem): void {
  ensureDir();
  fs.writeFileSync(path.join(NEWS_DIR, `${item.slug}.json`), JSON.stringify(item, null, 2), "utf-8");
}

export function deleteNews(slug: string): boolean {
  const fp = path.join(NEWS_DIR, `${slug}.json`);
  if (!fs.existsSync(fp)) return false;
  fs.unlinkSync(fp);
  return true;
}
