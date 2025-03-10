import { screenReaderConfig } from "@guidepup/playwright";
import { devices, PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  ...screenReaderConfig,
  reportSlowTests: null,
  timeout: 3 * 60 * 1000,
  retries: 2,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop chromium"], headless: false },
    },
    {
        name: "firefox",
        use: { ...devices["Desktop Firefox"], headless: false },
      },
  ],
};

export default config;