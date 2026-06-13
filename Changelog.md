# Changelog

## [Unreleased]

### Added
- `app/signup/page.tsx` — New `/signup` route (Next.js App Router). Thin page file; exports metadata and renders `SignupForm`.
- `components/auth/SignupForm.tsx` — Fully typed, client-side signup form component including:
  - Full Name, Email, Password, Confirm Password fields
  - Real-time per-field validation with accessible error messages (`aria-invalid`, `role="alert"`)
  - Password strength indicator (Weak / Fair / Strong)
  - Show/hide password toggles on both password fields
  - Loading spinner state during submission
  - Success state after account creation
  - Form-level error display for API/network errors
  - `TODO` comments marking all backend integration points

### Notes
- No existing routes were modified.
- No new dependencies added; uses only Next.js built-ins and Tailwind CSS.
- API integration is stubbed with a `TODO` comment inside `handleSubmit`.
