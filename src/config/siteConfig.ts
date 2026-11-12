import type { SiteConfig } from "@/types";

const WHATSAPP_TEXT = encodeURIComponent(
  "Здравствуйте! Хочу мгновенный расчёт стоимости мебели на заказ."
);

export const siteConfig: SiteConfig = {
  title: "MebelExpress",
  subtitle: "Мгновенный расчёт цены на мебель на заказ",
  offer:
    "Узнайте вилку стоимости шкафа, кухни или кровати за 1 минуту — без ожидания менеджера. Киллер-фича: мгновенная цена ±5…15%.",
  avatarUrl: "/avatar.svg",
  status: "Онлайн | Расчёт за 1 минуту",
  statusShort: "Принимаем заявки | Казахстан",
  phone: "+77078274377",
  whatsappUrl: `https://wa.me/77078274377?text=${WHATSAPP_TEXT}`,
  telegramUrl: "https://t.me/mebel_almaty",
  catalogUrl: "http://localhost:3002",
  socials: [
    {
      name: "Instagram",
      url: "https://instagram.com/mebel_almaty2016",
    },
  ],
  responseTime: "Пришлём ориентир цены и 3 варианта в WhatsApp",
  leadSuccessMessage:
    "Спасибо! Мы свяжемся с вами в течение 15 минут в WhatsApp с вилкой цены.",
};

export const leadCategories = [
  { value: "wardrobe", label: "Шкаф" },
  { value: "bed", label: "Мягкая кровать" },
  { value: "both", label: "Всё вместе" },
] as const;
