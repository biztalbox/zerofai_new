"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none transition-colors " +
  "focus:border-primary focus:ring-1 focus:ring-primary/40 " +
  "dark:border-white/10 bg-secondary dark:bg-secondary/40 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-primary";

const labelClass =
  "mb-1.5 block text-xs font-medium tracking-wide text-neutral-600 dark:text-[#94A3B8]";

/** Native select: dark dropdown list + options (OS support varies; color-scheme helps). */
const selectFieldClass =
  fieldClass +
  " appearance-auto cursor-pointer pr-9 " +
  "dark:[color-scheme:dark] " +
  "[&_option]:bg-white [&_option]:text-neutral-900 " +
  "dark:[&_option]:bg-[#161616] dark:[&_option]:text-neutral-100";

/** Lowercase domains commonly used for personal / free mail   business submissions should use corporate domains. */
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

function emailDomain(email: string): string | null {
  const t = email.trim().toLowerCase();
  const i = t.lastIndexOf("@");
  if (i < 0 || i === t.length - 1) return null;
  return t.slice(i + 1);
}

function isPersonalEmail(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain) return false;
  return PERSONAL_EMAIL_DOMAINS.has(domain);
}

function validateWorkEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (isPersonalEmail(trimmed)) {
    return "Please use your work email. Personal providers (Gmail, Yahoo, Outlook, etc.) are not accepted.";
  }
  return null;
}

const ROLE_LABELS: Record<string, string> = {
  "cto-ciso": "CTO / CISO",
  "vp-engineering": "VP Engineering",
  "it-director": "IT Director",
  "security-manager": "Security Manager",
  other: "Other",
};

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const emailInvalid = Boolean(emailError);
  const emailFieldClass =
    fieldClass +
    (emailInvalid
      ? " border-red-500 ring-1 ring-red-500/40 focus:border-red-500 focus:ring-red-500/40 dark:border-red-500 dark:focus:border-red-500"
      : "");

  const handleEmailBlur = () => {
    setEmailError(validateWorkEmail(email));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) {
      setEmailError(validateWorkEmail(value));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const err = validateWorkEmail(email);
    setEmailError(err);
    if (err) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("fullName") ?? "").trim();
    const workEmail = String(formData.get("email") ?? "").trim();
    const companyName = String(formData.get("company") ?? "").trim();
    const phoneNumber = String(formData.get("phone") ?? "").trim();
    let message = String(formData.get("message") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();

    if (!name || !workEmail || !companyName || !phoneNumber) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    if (role) {
      const roleLabel = ROLE_LABELS[role] ?? role;
      message = message
        ? `${message}\n\nDesignation: ${roleLabel}`
        : `Designation: ${roleLabel}`;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: workEmail,
          phone_number: phoneNumber,
          message,
          company_name: companyName,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSubmitError(
          typeof result.error === "string"
            ? result.error
            : "Something went wrong. Please try again."
        );
        return;
      }

      setSubmitSuccess(true);
      form.reset();
      setEmail("");
      setEmailError(null);
    } catch {
      setSubmitError("Unable to submit the form. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-full-name" className={labelClass}>
            Full Name
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Work Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="john@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            required
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? "contact-email-error" : undefined}
            className={emailFieldClass}
          />
          {emailError ? (
            <p
              id="contact-email-error"
              className="mt-1.5 text-xs! leading-tight! text-red-600! dark:text-red-400!"
              role="alert"
            >
              {emailError}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company Name
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="Acme Corp"
            autoComplete="organization"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            required
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-role" className={labelClass}>
          Designation{" "}
          <span className="text-xs! text-neutral-500! dark:text-neutral-500!">(optional)</span>
        </label>
        <select
          id="contact-role"
          name="role"
          className={selectFieldClass}
          defaultValue=""
          aria-required={false}
        >
          <option value="">Select designation…</option>
          <option value="cto-ciso">CTO / CISO</option>
          <option value="vp-engineering">VP Engineering</option>
          <option value="it-director">IT Director</option>
          <option value="security-manager">Security Manager</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="How can we help strengthen your security posture?"
          className={`${fieldClass} min-h-[110px] resize-y`}
        />
      </div>
      {submitError ? (
        <p className="text-sm! leading-relaxed! text-red-600! dark:text-red-400!" role="alert">
          {submitError}
        </p>
      ) : null}
      {submitSuccess ? (
        <p className="text-sm! leading-relaxed! text-green-700! dark:text-green-400!" role="status">
          Thank you! Your message has been submitted. Our team will get back to you soon.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-hover active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Request Demo"}
      </button>
    </form>
  );
}
