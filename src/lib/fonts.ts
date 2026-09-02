/**
 * Intentionally empty.
 *
 * This module used to configure TWK Everett through next/font/local. That
 * loader made Turbopack panic on every dev compile ("FATAL: An unexpected
 * Turbopack error occurred"), and Next.js recovered from each panic by
 * rebuilding and hard-reloading every open tab — an endless reload loop.
 *
 * The fonts are now declared as plain @font-face rules in src/app/globals.css,
 * pointing at the same subsetted WOFF2 files in public/twk-everett/, and the
 * two above-the-fold weights are preloaded by hand in src/app/(site)/layout.tsx.
 *
 * Nothing imports this file. It is kept only so the reason is recorded.
 */

export {};
