import { nvdaTest as test } from "@guidepup/playwright";
import { nvda } from '@guidepup/guidepup';
import { expect } from "@playwright/test";

test.describe("Playwright VoiceOver", () => {
    test("I can navigate the Guidepup Github page", async ({
        page,
        nvda,
    }) => {
        // Navigate to Guidepup GitHub page
        await page.goto("https://github.com/guidepup/guidepup", {
            waitUntil: "load",
        });

        // Wait for page to be ready
        await expect(page.locator('header[role="banner"]')).toBeVisible();

        // Interact with the page
        await nvda.navigateToWebContent();

        // Move across the page menu to the Guidepup heading using VoiceOver
        while (await nvda.itemText() != "clickable, Guidepup, heading, level 1") {
            await nvda.perform(nvda.keyboardCommands.moveToNextHeading);            
        }

        var spokenPhrases = JSON.stringify(await nvda.spokenPhraseLog());

        expect(spokenPhrases).toMatchSnapshot({maxDiffPixels: 10});
        
    });
});