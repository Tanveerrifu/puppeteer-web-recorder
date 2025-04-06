const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");
const url = require("url");

// Get today's date for the main folder
const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
const baseDir = path.join(__dirname, "screenshots", today);
fs.ensureDirSync(baseDir); // Ensure base directory exists

const visited = new Set(); // Store visited URLs

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const startUrl = "https://qabrains.com/"; // Change to your target website
  await crawlPage(page, startUrl);

  await browser.close();
  console.log("✅ Crawling & PDF saving completed!");
})();

async function crawlPage(page, currentUrl) {
  if (visited.has(currentUrl)) return;
  visited.add(currentUrl);

  try {
    await page.goto(currentUrl, { waitUntil: "domcontentloaded" });

    // Wait 30 seconds before taking a screenshot
    console.log(`⏳ Waiting 30 seconds on: ${currentUrl}`);
    await new Promise((resolve) => setTimeout(resolve, 30000)); // Fixed waiting

    // Convert URL to a valid folder name
    let folderName =
      url.parse(currentUrl).pathname.replace(/\//g, "_") || "home";
    folderName = folderName.replace(/[^a-zA-Z0-9_]/g, ""); // Remove special characters
    const outputDir = path.join(baseDir, folderName);
    await fs.ensureDir(outputDir);

    // Save page as a full-page PDF
    const pdfPath = path.join(outputDir, "page.pdf");
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

    console.log(`📄 Saved PDF: ${pdfPath}`);

    // Find and follow internal links
    const links = await page.$$eval("a", (anchors) =>
      anchors
        .map((a) => a.href)
        .filter((href) => href.startsWith(window.location.origin))
    );

    for (const link of links) {
      await crawlPage(page, link);
    }
  } catch (error) {
    console.error(`❌ Error processing ${currentUrl}:`, error.message);
  }
}
