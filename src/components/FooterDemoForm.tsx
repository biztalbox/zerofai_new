"use client";

import { useState, type FormEvent } from "react";

import {
  normalizePhone,
  toApiBody,
  validateCompany,
  validateEmail,
  validateName,
  validatePhone,
} from "@/app/(site)/contact/contactValidation";

const fieldClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm py-1.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40";

export function FooterDemoForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("fullName") ?? "").trim();
    const workEmail = String(formData.get("email") ?? "").trim();
    const companyName = String(formData.get("company") ?? "").trim();
    const phoneNumber = String(formData.get("phone") ?? "").trim();

    const nameErr = validateName(name);
    if (nameErr) {
      setSubmitError(nameErr);
      return;
    }

    const emailErr = validateEmail(workEmail);
    setEmailError(emailErr);
    if (emailErr) return;

    const companyErr = validateCompany(companyName);
    if (companyErr) {
      setSubmitError(companyErr);
      return;
    }

    const phoneErr = validatePhone(phoneNumber);
    if (phoneErr) {
      setSubmitError(phoneErr);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          toApiBody({
            name,
            email: workEmail,
            company: companyName,
            phone: normalizePhone(phoneNumber),
            designation: "",
            message: "Book a demo request from footer",
          })
        ),
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
      setSubmitError("Unable to submit. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">

      <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-3">
          <input
            id="footer-demo-name"
            name="fullName"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            required
            className={fieldClass}
          />

          <input
            id="footer-demo-email"
            name="email"
            type="email"
            placeholder="Work Email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) {
                const trimmed = e.target.value.trim();
                setEmailError(trimmed ? validateEmail(trimmed) : null);
              }
            }}
            onBlur={() => {
              const trimmed = email.trim();
              setEmailError(trimmed ? validateEmail(trimmed) : null);
            }}
            required
            aria-invalid={Boolean(emailError)}
            aria-label="Work Email"
            className={
              fieldClass +
              (emailError
                ? " border-red-400/70 ring-1 ring-red-400/40 focus:border-red-400 focus:ring-red-400/40"
                : "")
            }
          />
        </div>

        {emailError ? (
          <p className="text-xs text-red-300" role="alert">
            {emailError}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <input
            id="footer-demo-company"
            name="company"
            type="text"
            placeholder="Company Name"
            autoComplete="organization"
            required
            className={fieldClass}
          />

          <input
            id="footer-demo-phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            autoComplete="tel"
            required
            className={fieldClass}
          />
        </div>

        {submitError ? (
          <p className="text-xs leading-relaxed text-red-300" role="alert">
            {submitError}
          </p>
        ) : null}

        {submitSuccess ? (
          <p className="text-xs leading-relaxed text-emerald-300" role="status">
            Thank you! Our team will reach out shortly to schedule your demo.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit block ml-auto! px-3 rounded bg-primary py-1.5 text-sm font-semibold text-white transition hover:bg-[#005a63] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Request Demo"}
        </button>
      </form>
    </div>
  );
}
