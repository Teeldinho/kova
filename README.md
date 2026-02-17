# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.

## Local Stripe Setup

To run checkout locally, create `.env.local` with test keys from Stripe Dashboard:

```bash
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

- Open Stripe Dashboard -> Developers -> API keys (Test mode).
- Restart the dev server after updating environment variables.
