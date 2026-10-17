# LEGAL WORKER 0006H — REVIEW REQUIRED

- 16 AiVenture-owned domains; ecbtax.com explicitly excluded.
- 14 legal page routes are reserved, but return HTTP 503 until legal content is approved.
- Footer Quick Links are appended only to `<footer>` on explicitly routed sites. Exact existing Quick Links selector still needs site-specific review.
- No KV, no Cloudflare production routes, no secrets.
- UPSTREAM_ORIGIN must point to a distinct origin to avoid recursion.
- No legal text is asserted as approved. Verify representative and legal disclosures before publication.
- Do not merge or deploy without review.
