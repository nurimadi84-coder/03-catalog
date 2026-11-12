import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "screenshots", "catalog-filter-modal.png");
mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto("http://localhost:3001/catalog", { waitUntil: "networkidle" });
await page.getByRole("tab", { name: /Шкафы/ }).click();
await page.waitForSelector("text=Найдено: 4");
await page.getByRole("button", { name: "Подробнее / Заказать" }).first().click();
await page.waitForSelector('[role="dialog"]');
await page.waitForTimeout(500);

await page.screenshot({ path: out, fullPage: false });
await browser.close();

console.log("SCREENSHOT_OK", out);
