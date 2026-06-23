import fs from "fs";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface Article {
  slug: string;
  titleFa: string;
  titleEn: string;
  summaryFa: string;
  summaryEn: string;
  bodyFa: string;
  bodyEn: string;
  category: string;
  coverImage: string;
  gallery: string[];
  publishedAt: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

function ensureDir() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export function getAllArticles(): Article[] {
  ensureDir();
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8")) as Article)
    .sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1));
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.status === "published");
}

export function getArticleBySlug(slug: string): Article | undefined {
  ensureDir();
  const fp = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(fp)) return undefined;
  return JSON.parse(fs.readFileSync(fp, "utf-8")) as Article;
}

export function saveArticle(article: Article): void {
  ensureDir();
  fs.writeFileSync(path.join(ARTICLES_DIR, `${article.slug}.json`), JSON.stringify(article, null, 2), "utf-8");
}

export function deleteArticle(slug: string): boolean {
  const fp = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(fp)) return false;
  fs.unlinkSync(fp);
  return true;
}
