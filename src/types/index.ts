import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type LeadCategory = "wardrobe" | "bed" | "both";

export type ThemeMode = "light" | "dark" | "system";

export interface SocialLink {
  name: string;
  url: string;
}

export interface ActionButtonConfig {
  id: string;
  label: string;
  description: string;
  href?: string;
  action?: "openLeadForm";
  variant: "whatsapp" | "accent" | "secondary" | "outline";
  icon: LucideIcon;
  external?: boolean;
}

export interface SiteConfig {
  title: string;
  subtitle: string;
  offer: string;
  avatarUrl: string;
  status: string;
  statusShort: string;
  phone: string;
  whatsappUrl: string;
  telegramUrl: string;
  catalogUrl: string;
  socials: SocialLink[];
  responseTime: string;
  leadSuccessMessage: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  category: LeadCategory;
}

export interface LeadFormErrors {
  name?: string;
  phone?: string;
  category?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface StatusBadgeProps {
  label: string;
}

export interface ActionButtonsProps {
  onOpenLeadForm: () => void;
}

export interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
