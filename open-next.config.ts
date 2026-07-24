import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config: this app has no ISR/on-demand revalidation (no `revalidate`
// exports, no tagged fetches), so the adapter's default caching behavior is
// sufficient — no KV/R2 incremental cache binding is required.
export default defineCloudflareConfig();
