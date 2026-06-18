import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone ETL tool with its own package.json; not part of the app build.
    "data-pipeline/**",
    // Generated mobile-harness artifacts (HTML report, screenshots, traces).
    "tests/mobile/report/**",
    "tests/mobile/__screenshots__/**",
    "test-results/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
