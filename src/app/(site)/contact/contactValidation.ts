export const CONTINUE = {
  name: "Please write your correct name to continue.",
  email: "Please write your correct work email to continue.",
  company: "Please write your correct company name to continue.",
  phone: "Please write your correct phone number to continue.",
  designation: "Please write your correct designation to continue.",
  message: "Please write your correct message to continue.",
} as const;

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "aol.com",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "yandex.com",
  "yandex.ru",
  "tutanota.com",
  "tutanota.de",
  "fastmail.com",
  "hey.com",
]);

const EMAIL_DOMAIN_TYPOS: Record<string, string> = {
  "goggle.com": "gmail.com",
  "gogle.com": "gmail.com",
  "googl.com": "gmail.com",
  "googel.com": "gmail.com",
  "goolge.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.comm": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahho.com": "yahoo.com",
  "outlok.com": "outlook.com",
  "outlool.com": "outlook.com",
  "hotmial.com": "hotmail.com",
  "hotmil.com": "hotmail.com",
};

const REFERENCE_EMAIL_DOMAINS = [...PERSONAL_EMAIL_DOMAINS, "google.com"];

const EMAIL_FORMAT_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const NAME_RE = /^[a-zA-Z]([a-zA-Z\s'.-]{0,98}[a-zA-Z.])?$/;

export function emailDomain(email: string): string | null {
  const t = email.trim().toLowerCase();
  const i = t.lastIndexOf("@");
  if (i < 0 || i === t.length - 1) return null;
  return t.slice(i + 1);
}

export function emailLocalPart(email: string): string | null {
  const t = email.trim().toLowerCase();
  const i = t.lastIndexOf("@");
  if (i <= 0) return null;
  return t.slice(0, i);
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );
  for (let i = 0; i < rows; i++) matrix[i][0] = i;
  for (let j = 0; j < cols; j++) matrix[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function findLikelyEmailTypo(domain: string): string | null {
  if (EMAIL_DOMAIN_TYPOS[domain]) return EMAIL_DOMAIN_TYPOS[domain];
  for (const ref of REFERENCE_EMAIL_DOMAINS) {
    if (domain === ref) continue;
    const dist = levenshtein(domain, ref);
    if (dist === 1) return ref;
    if (dist === 2 && Math.abs(domain.length - ref.length) <= 1) return ref;
  }
  return null;
}

export function isPersonalEmail(email: string): boolean {
  const domain = emailDomain(email);
  return domain ? PERSONAL_EMAIL_DOMAINS.has(domain) : false;
}

export function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits;
}

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your name.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (!NAME_RE.test(trimmed)) {
    return "Please write your correct name (letters only, no numbers or symbols).";
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "Please enter your email address.";

  if (!EMAIL_FORMAT_RE.test(trimmed)) {
    return "Please write the correct email address.";
  }

  const domain = emailDomain(trimmed);
  const local = emailLocalPart(trimmed);
  if (!domain || !local) return "Please write the correct email address.";

  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return "Please write the correct email address.";
  }

  const typo = findLikelyEmailTypo(domain);
  if (typo) {
    return `That email doesn't look correct. Did you mean ${local}@${typo}?`;
  }

  if (isPersonalEmail(trimmed)) {
    return "Please use your work email. Personal providers (Gmail, Yahoo, Outlook, etc.) are not accepted.";
  }

  return null;
}

export function validateCompany(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your company name.";
  if (trimmed.length < 2) return "Company name must be at least 2 characters.";
  if (/^\d+$/.test(trimmed)) return "Please write your correct company name.";
  return null;
}

export function validatePhone(value: string): string | null {
  const digits = normalizePhone(value);
  if (!digits) return "Please enter your phone number.";
  if (digits.length !== 10) {
    return "Phone number not valid. Please enter a 10-digit number.";
  }
  return null;
}

export function validateDesignation(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your designation.";
  if (trimmed.length < 2) return "Designation must be at least 2 characters.";
  return null;
}

export function validateMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please tell us how we can help you.";
  if (trimmed.length < 5) return "Message must be at least 5 characters.";
  return null;
}

export function validateWorkEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return validateEmail(trimmed);
}

export function buildApiMessage(message: string, designation: string): string {
  const msg = message.trim();
  const role = designation.trim();
  if (role && msg) return `${msg}\n\nDesignation: ${role}`;
  if (role) return `Designation: ${role}`;
  return msg;
}

export function isPhoneError(error: string): boolean {
  return /phone/i.test(error);
}

export function isEmailError(error: string): boolean {
  return /email|mail/i.test(error);
}

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  phone: string;
  designation: string;
  message: string;
};

export function validateContactPayload(data: ContactPayload): string | null {
  return (
    validateName(data.name) ??
    validateEmail(data.email) ??
    validateCompany(data.company) ??
    validatePhone(data.phone) ??
    validateMessage(data.message)
  );
}

export function toApiBody(data: ContactPayload) {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone_number: normalizePhone(data.phone),
    company_name: data.company.trim(),
    designation: data.designation.trim(),
    message: data.message.trim(),
  };
}
