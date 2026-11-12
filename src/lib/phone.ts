/** Keep digits only. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Extract up to 10 national digits for mask +7 (7XX) XXX-XX-XX.
 * Handles: 8XXXXXXXXXX, 7XXXXXXXXXX, local 7XXXXXXXXX paste, and progressive masked typing.
 */
export function toNationalDigits(value: string): string {
  let digits = digitsOnly(value);

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  const hasCountryMarkup = /^\s*\+/.test(value) || value.includes("(");

  // Raw local paste: 10-digit national number without +7 / mask markup
  if (
    digits.length === 10 &&
    digits.startsWith("7") &&
    !hasCountryMarkup
  ) {
    return digits;
  }

  // Country code already present (typed via mask, or 11-digit 7…)
  if (digits.startsWith("7")) {
    return digits.slice(1, 11);
  }

  return digits.slice(0, 10);
}

export function normalizePhoneDigits(value: string): string {
  const national = toNationalDigits(value);
  return national ? `7${national}` : "";
}

export function formatPhoneInput(value: string): string {
  const national = toNationalDigits(value);
  const parts = [
    national.slice(0, 3),
    national.slice(3, 6),
    national.slice(6, 8),
    national.slice(8, 10),
  ].filter(Boolean);

  if (parts.length === 0) return value.trim() === "" && national === "" ? "" : "+7";

  let result = `+7 (${parts[0]}`;
  if (parts[0].length === 3) result += ")";
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;

  return result;
}

/** Valid mobile matching mask +7 (7XX) XXX-XX-XX */
export function isValidKzPhone(value: string): boolean {
  return /^7\d{9}$/.test(toNationalDigits(value));
}

export function toE164(value: string): string {
  const national = toNationalDigits(value);
  return national.length === 10 ? `+7${national}` : `+${normalizePhoneDigits(value)}`;
}
