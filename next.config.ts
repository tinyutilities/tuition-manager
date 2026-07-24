import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

// Gives `next dev` access to the Cloudflare context (bindings, etc.) so
// local development behaves the same as the deployed Worker. This is a
// dev-only hook and has no effect on `next build`/`next start`.
initOpenNextCloudflareForDev();

export default nextConfig;
