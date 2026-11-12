# Отчёт: витрина / каталог (идея №3) — 03-catalog

**Проект:** `03-catalog`  
**URL:** http://localhost:3001/catalog  
**Дата:** 2026-11-09  
**Скриншот-доказательство:** [`screenshots/catalog-filter-modal.png`](../screenshots/catalog-filter-modal.png)

---

## 1. Скриншот (фильтр + модалка)

| Параметр | Значение |
|----------|----------|
| Файл | `screenshots/catalog-filter-modal.png` |
| Как снят | Playwright headless Chromium, viewport 1280×800 |
| Сценарий | Открыт `/catalog` → таб **Шкафы** → `Найдено: 4` → **Подробнее / Заказать** у «Flute Mirror» |
| На скрине | Модалка шкафа «Flute Mirror»: фото, описание, блок **Характеристики**, фон сетки карточек |

Скрипт захвата: `scripts/capture-catalog-evidence.mjs`

```text
SCREENSHOT_OK ...\mebel-link\screenshots\catalog-filter-modal.png
```

---

## 2. Чек-лист идеи №3

| # | Требование | Статус | Evidence |
|---|------------|--------|----------|
| 1 | Сетка: фото, название, цена, бейджи характеристик, «Подробнее / Заказать» | ✅ PASS | `ProductCard.tsx` |
| 2 | Живой поиск (debounce 300 мс) | ✅ PASS | `useCatalogFilter.ts` → `DEBOUNCE_MS = 300` |
| 3 | Категории: «Все» + ≥3 категории со счётчиками | ✅ PASS | Все (15) / Кровати (10) / Шкафы (4) / Детские (1) |
| 4 | Модалка: фото, описание, параметры, продавец | ✅ PASS | `ProductModal.tsx` + блок MebelExpress |
| 5 | Заказ в 2 клика (форма → WhatsApp) | ✅ PASS | `QuickOrderForm.tsx` → `wa.me/77078274377` |
| 6 | Empty state + «Сбросить фильтры» | ✅ PASS | `EmptyState.tsx` + `resetFilters()` |

---

## 3. Логи проверок (команды)

### 3.1 Lint

```text
> mebel-link@0.1.0 lint
> eslint

LINT_EXIT:0
```

### 3.2 Build

```text
> mebel-link@0.1.0 build
> next build

▲ Next.js 16.4.5 (Turbopack)
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages (6/6)

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /catalog
└ ○ /quiz

BUILD_EXIT:0
```

### 3.3 HTTP runtime

```text
GET http://localhost:3001/catalog
HTTP_STATUS:200 BYTES:82041

GET http://localhost:3001/images/catalog/wardrobe-flute-mirror.jpg
IMG_STATUS:200 CT:image/jpeg LEN:39523
```

### 3.4 Браузерная проверка (ручной прогон)

| Шаг | Результат |
|-----|-----------|
| Таб **Шкафы** | `aria-selected=true`, `Найдено: 4` |
| Открытие модалки | Dialog «Шкаф «Flute Mirror»…», галерея, характеристики, продавец, форма заказа |
| Поиск `zzzz-not-found-xyz` | `Найдено: 0`, текст «ничего не найдено», кнопка «Сбросить фильтры» |
| Сброс фильтров | Снова `Найдено: 15` |

---

## 4. Независимый аудит

**Агент:** независимый verifier (general-purpose), код не изменял.  
**Вердикт аудита:** **PASS**

### Краткое заключение аудитора

1. Все 6 пунктов чек-листа идеи №3 — PASS.  
2. `lint` / `build` — exit 0, маршрут `/catalog` статически пререндерится.  
3. Реальные JPG с Instagram `@mebel_almaty2016` подключены локально (`public/images/catalog/*.jpg`, hashes совпадают с `instagram/ig-*.jpg`).  
4. Категории: beds 10 / wardrobes 4 / kids 1.  
5. WhatsApp-заказ собирает товар, артикул, цену, имя и телефон.

### Некритичные замечания аудита

- Часть карточек шкаф/кровать делит один Instagram-кадр комплекта (пути валидны, JPEG отдаётся).  
- Текст «Быстрый заказ» появляется только после открытия модалки (ожидаемо для client-modal).

---

## 5. Итог

| Метрика | Результат |
|---------|-----------|
| Чек-лист идеи №3 | 6/6 PASS |
| Lint | PASS (0) |
| Build | PASS (0) |
| HTTP `/catalog` | 200 |
| Скриншот filter+modal | сохранён |
| Независимый аудит | **VERDICT: PASS** |

**Каталог готов к демонстрации витрины идеи №3.**
