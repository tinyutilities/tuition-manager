// lib/config.ts

// Centralized toggle for the mock data layer. When true, every mock
// repository seeds itself with realistic demo data (useful for local
// development and UI review). When false, every repository starts empty,
// matching what a newly authenticated user should see before they've
// created anything of their own.
//
// Set NEXT_PUBLIC_USE_DEMO_DATA="false" to see the empty-state experience.
export const USE_DEMO_DATA = process.env.NEXT_PUBLIC_USE_DEMO_DATA !== "false";
