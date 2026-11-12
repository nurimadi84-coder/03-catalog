import type { CategoryItem, Product } from "@/types/catalog";

export const CATEGORIES: CategoryItem[] = [
  { id: "all", label: "Все" },
  { id: "beds", label: "Кровати" },
  { id: "wardrobes", label: "Шкафы" },
  { id: "kids", label: "Детские" },
];

/**
 * Демо-каталог на реальных фото с Instagram @mebel_almaty2016
 * Источник: https://www.instagram.com/mebel_almaty2016/
 */
export const PRODUCTS_DATA: Product[] = [
  {
    id: "bed-navy-set",
    title: "Кровать «Navy Soft» с высоким изголовьем",
    category: "beds",
    priceFrom: 145000,
    image: "/images/catalog/bed-navy-set.jpg",
    gallery: [
      "/images/catalog/bed-navy-set.jpg",
      "/images/catalog/wardrobe-navy.jpg",
    ],
    status: "hit",
    statusLabel: "Хит продаж",
    rating: 4.95,
    reviewsCount: 28,
    shortDescription:
      "Мягкая кровать глубокого синего цвета — из реального проекта @mebel_almaty2016.",
    fullDescription:
      "Установленная на объекте мягкая кровать с высоким разделённым изголовьем. В комплекте на фото — шкаф в тон и декоративная стеновая панель. Размер и ткань подбираются индивидуально.",
    specs: {
      material: "Износостойкий велюр, брус, ЛДСП",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "7-12 рабочих дней",
    },
  },
  {
    id: "wardrobe-flute-mirror",
    title: "Шкаф «Flute Mirror» с зеркалом",
    category: "wardrobes",
    priceFrom: 220000,
    image: "/images/catalog/wardrobe-flute-mirror.jpg",
    gallery: ["/images/catalog/wardrobe-flute-mirror.jpg"],
    status: "new",
    statusLabel: "Новинка",
    rating: 4.9,
    reviewsCount: 17,
    shortDescription:
      "Шкаф с фрезерованными фасадами, диагональным молдингом и центральным зеркалом.",
    fullDescription:
      "Реальный шкаф из портфолио @mebel_almaty2016: вертикальная фрезеровка, двухцветные фасады, зеркальная створка и металлические ручки. Изготовление по замеру помещения.",
    specs: {
      material: "ЛДСП / МДФ фрезеровка, зеркало",
      dimensions: "По замеру (ширина от 180 см)",
      warranty: "18 месяцев",
      productionTime: "10-16 рабочих дней",
    },
  },
  {
    id: "wardrobe-sage-flute",
    title: "Шкаф «Sage Flute» с рифлёными фасадами",
    category: "wardrobes",
    priceFrom: 245000,
    image: "/images/catalog/wardrobe-sage-flute.jpg",
    gallery: [
      "/images/catalog/wardrobe-sage-flute.jpg",
      "/images/catalog/set-sage-flute.jpg",
    ],
    status: "hit",
    statusLabel: "Хит продаж",
    rating: 5.0,
    reviewsCount: 21,
    shortDescription:
      "Большой шкаф в оттенке шалфей с вертикальной фрезеровкой и зеркалом.",
    fullDescription:
      "Фото с реального объекта: шкаф почти до потолка, золотистые ручки, зеркальная секция. Можно заказать комплектом с кроватью и комодом в одной ткани/цвете.",
    specs: {
      material: "МДФ фрезеровка, ЛДСП, зеркало",
      dimensions: "По замеру помещения",
      warranty: "18 месяцев",
      productionTime: "12-18 рабочих дней",
    },
  },
  {
    id: "bed-sage-flute",
    title: "Кровать «Sage Channel» в комплекте",
    category: "beds",
    priceFrom: 155000,
    image: "/images/catalog/set-sage-flute.jpg",
    gallery: [
      "/images/catalog/set-sage-flute.jpg",
      "/images/catalog/wardrobe-sage-flute.jpg",
    ],
    status: "new",
    statusLabel: "Новинка",
    rating: 4.92,
    reviewsCount: 19,
    shortDescription:
      "Мягкая кровать с вертикальной стяжкой и прикроватными тумбами в тон шкафу.",
    fullDescription:
      "Кровать из комплекта спальни шалфейного цвета. На фото — реальная установка с тумбами и мягким изголовьем. Ткань и размер — под заказ.",
    specs: {
      material: "Велюр / Рогожка, брус, ЛДСП",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "7-12 рабочих дней",
    },
  },
  {
    id: "bed-twin-beige",
    title: "Односпальные кровати «Beige Twin»",
    category: "beds",
    priceFrom: 98000,
    image: "/images/catalog/bed-twin-beige.jpg",
    gallery: ["/images/catalog/bed-twin-beige.jpg"],
    status: "in_stock",
    statusLabel: "В наличии",
    rating: 4.88,
    reviewsCount: 14,
    shortDescription:
      "Пара мягких односпальных кроватей с канальным изголовьем — фото с объекта.",
    fullDescription:
      "Идеальны для детской или гостевой. Высокое мягкое изголовье с вертикальной стяжкой, компактный корпус. Цена указана за одну кровать.",
    specs: {
      material: "Текстиль рогожка / велюр",
      dimensions: "90x190 / 90x200 см",
      warranty: "18 месяцев",
      productionTime: "7-10 рабочих дней",
    },
  },
  {
    id: "bed-charcoal-channel",
    title: "Кровать «Charcoal Channel» с основанием",
    category: "beds",
    priceFrom: 135000,
    image: "/images/catalog/bed-charcoal-channel.jpg",
    gallery: ["/images/catalog/bed-charcoal-channel.jpg"],
    status: "hit",
    statusLabel: "Хит продаж",
    rating: 4.94,
    reviewsCount: 33,
    shortDescription:
      "Графитовая мягкая кровать с вертикальной стяжкой и ортопедическим основанием.",
    fullDescription:
      "Реальное фото после сборки: видно ламельное основание и усиленный каркас. Подходит под матрас 160/180. Возможен подъёмник и ниша для белья.",
    specs: {
      material: "Велюр графит, брус, ламели",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "7-12 рабочих дней",
    },
  },
  {
    id: "bed-gray-split",
    title: "Кровать «Gray Split» с панелями",
    category: "beds",
    priceFrom: 149000,
    image: "/images/catalog/bed-gray-split.jpg",
    gallery: ["/images/catalog/bed-gray-split.jpg"],
    status: "new",
    statusLabel: "Новинка",
    rating: 4.9,
    reviewsCount: 16,
    shortDescription:
      "Серая мягкая кровать с разделённым изголовьем и подвесными тумбами.",
    fullDescription:
      "Установка на объекте с декоративными стеновыми панелями. Матрас на фото в защитной плёнке — изделие только смонтировано. Индивидуальные размеры и ткани.",
    specs: {
      material: "Велюр, ЛДСП, брус",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "8-14 рабочих дней",
    },
  },
  {
    id: "bed-sunburst",
    title: "Кровать «Sunburst Soft» с золотым кантом",
    category: "beds",
    priceFrom: 165000,
    image: "/images/catalog/bed-sunburst-set.jpg",
    gallery: [
      "/images/catalog/bed-sunburst-set.jpg",
      "/images/catalog/wardrobe-arched-mirror.jpg",
    ],
    status: "hit",
    statusLabel: "Хит продаж",
    rating: 4.97,
    reviewsCount: 24,
    shortDescription:
      "Бежевое изголовье «солнце» с металлическим кантом — фото реального интерьера.",
    fullDescription:
      "Эффектное изголовье с лучевой стяжкой. На снимке — комплект со шкафом с арочными зеркалами. Можно заказать кровать отдельно или спальный гарнитур.",
    specs: {
      material: "Велюр, металлический кант, брус",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "10-14 рабочих дней",
    },
  },
  {
    id: "wardrobe-arched-mirror",
    title: "Шкаф «Arched Mirror» со вставками",
    category: "wardrobes",
    priceFrom: 260000,
    image: "/images/catalog/wardrobe-arched-mirror.jpg",
    gallery: [
      "/images/catalog/wardrobe-arched-mirror.jpg",
      "/images/catalog/bed-sunburst-set.jpg",
    ],
    status: "pre_order",
    statusLabel: "Под заказ",
    rating: 4.93,
    reviewsCount: 12,
    shortDescription:
      "Шкаф с арочными зеркальными вставками и золотистыми ручками.",
    fullDescription:
      "Корпусная мебель из портфолио @mebel_almaty2016: тёплый древесный декор, фигурные зеркала и длинные ручки. Полностью под размер комнаты.",
    specs: {
      material: "ЛДСП / МДФ, зеркало, металл",
      dimensions: "По замеру помещения",
      warranty: "18 месяцев",
      productionTime: "12-18 рабочих дней",
    },
  },
  {
    id: "bed-luxury-grey",
    title: "Кровать «Luxury Grey» с изножьем",
    category: "beds",
    priceFrom: 185000,
    image: "/images/catalog/bed-luxury-grey.jpg",
    gallery: ["/images/catalog/bed-luxury-grey.jpg"],
    status: "hit",
    statusLabel: "Хит продаж",
    rating: 5.0,
    reviewsCount: 31,
    shortDescription:
      "Премиальная серая кровать с канальной стяжкой на изголовье и изножье.",
    fullDescription:
      "Студийный кадр готового изделия: высокий изголовье с «ушками», мягкое изножье, металлические опоры. Ткань и габариты — по вашему проекту.",
    specs: {
      material: "Бархат / велюр, металл",
      dimensions: "160x200 / 180x200 / 200x200 см",
      warranty: "24 месяца",
      productionTime: "10-16 рабочих дней",
    },
  },
  {
    id: "bed-kids-corner",
    title: "Детская кровать «Corner Soft»",
    category: "kids",
    priceFrom: 115000,
    image: "/images/catalog/bed-kids-corner.jpg",
    gallery: ["/images/catalog/bed-kids-corner.jpg"],
    status: "new",
    statusLabel: "Новинка",
    rating: 4.91,
    reviewsCount: 11,
    shortDescription:
      "Угловая мягкая кровать с бортиком и ящиком — реальная детская комната.",
    fullDescription:
      "L-образное мягкое изголовье с вертикальной стяжкой и нижним ящиком. Безопасные скругления, ткань на выбор. Фото с объекта @mebel_almaty2016.",
    specs: {
      material: "Гипоаллергенный велюр, ЛДСП",
      dimensions: "90x190 / 120x190 см",
      warranty: "18 месяцев",
      productionTime: "7-12 рабочих дней",
    },
  },
  {
    id: "bed-geo-gold",
    title: "Кровать «Geo Gold» с 3D-изголовьем",
    category: "beds",
    priceFrom: 158000,
    image: "/images/catalog/bed-geo-gold.jpg",
    gallery: [
      "/images/catalog/bed-geo-gold.jpg",
      "/images/catalog/bed-geo-lift.jpg",
    ],
    status: "new",
    statusLabel: "Новинка",
    rating: 4.89,
    reviewsCount: 15,
    shortDescription:
      "Бежевое изголовье с геометрической стёжкой и золотым кантом.",
    fullDescription:
      "Фото каркаса до установки матраса: видна конструкция и декоративная панель изголовья. Изготовление по индивидуальным размерам.",
    specs: {
      material: "Велюр / экокожа, металлический кант",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "8-14 рабочих дней",
    },
  },
  {
    id: "bed-geo-lift",
    title: "Кровать «Geo Lift» с подъёмником",
    category: "beds",
    priceFrom: 168000,
    image: "/images/catalog/bed-geo-lift.jpg",
    gallery: [
      "/images/catalog/bed-geo-lift.jpg",
      "/images/catalog/bed-geo-gold.jpg",
    ],
    status: "hit",
    statusLabel: "Хит продаж",
    rating: 4.96,
    reviewsCount: 27,
    shortDescription:
      "Кровать с геометрическим изголовьем, тумбами и нишей для белья.",
    fullDescription:
      "Комплект с мягкими тумбами в одной ткани. На изножье — петля подъёмного механизма. Реальная установка из Instagram-портфолио.",
    specs: {
      material: "Велюр, газлифты, ЛДСП",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "10-14 рабочих дней",
    },
  },
  {
    id: "bed-rose-channel",
    title: "Кровать «Rose Channel» с подъёмником",
    category: "beds",
    priceFrom: 152000,
    image: "/images/catalog/bed-rose-channel.jpg",
    gallery: ["/images/catalog/bed-rose-channel.jpg"],
    status: "in_stock",
    statusLabel: "В наличии",
    rating: 4.87,
    reviewsCount: 18,
    shortDescription:
      "Пыльно-розовая мягкая кровать с канальной стяжкой и металлическими вставками.",
    fullDescription:
      "Свежая сборка на объекте: матрас ещё в плёнке. Вертикальная стяжка, декоративные металлические полосы на изголовье, петля подъёмника.",
    specs: {
      material: "Велюр dusty rose, металл, брус",
      dimensions: "160x200 / 180x200 см",
      warranty: "18 месяцев",
      productionTime: "7-12 рабочих дней",
    },
  },
  {
    id: "wardrobe-navy",
    title: "Шкаф «Navy Matte» в тон кровати",
    category: "wardrobes",
    priceFrom: 210000,
    image: "/images/catalog/wardrobe-navy.jpg",
    gallery: [
      "/images/catalog/wardrobe-navy.jpg",
      "/images/catalog/bed-navy-set.jpg",
    ],
    status: "pre_order",
    statusLabel: "Под заказ",
    rating: 4.9,
    reviewsCount: 13,
    shortDescription:
      "Матовый шкаф глубокого синего цвета с декоративными чёрными ручками.",
    fullDescription:
      "Шкаф из комплекта спальни на реальном объекте. Гладкие фасады, высокие ручки, цвет в тон мягкой кровати. Изготовление строго по замеру.",
    specs: {
      material: "ЛДСП / эмаль / МДФ",
      dimensions: "По замеру помещения",
      warranty: "18 месяцев",
      productionTime: "10-16 рабочих дней",
    },
  },
];
