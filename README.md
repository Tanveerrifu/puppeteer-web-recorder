# puppeteer-web-recorder

This project is a **headless web crawler built with Puppeteer** that visits all internal pages of a website, waits for full page load, and saves each page as a **full-page PDF** in an organized folder structure. Useful for **QA engineers**, **web archivists**, and **content reviewers**.

---

## 📌 Features

✅ Automatically crawls all internal links on a website  
✅ Waits 30 seconds per page to allow full rendering  
✅ Saves every page as a full-page **PDF snapshot**  
✅ Organizes output in folders using the current date and URL structure  
✅ Helps track **UI changes across builds**  

---

## 🚀 How It Helps QA Teams

- 🎯 **Regression Tracking**: Snapshot every page to compare between builds  
- 📷 **Visual Archiving**: Keep historical UI records  
- 🔎 **Link & Content Audits**: Ensure all internal links are working and rendered  
- ✅ **No need for manual screenshots**

---

## 🛠 Setup

### 1. Clone this repo

git clone https://github.com/your-username/website-pdf-crawler.git
cd website-pdf-crawler
2. Install dependencies

npm install puppeteer fs-extra
3. Configure the starting URL
In web_crawler.js, change:


const startUrl = 'https://example.com'; // <-- your site here

4. Run the crawler
node web_crawler.js

🗂 Output Example
screenshots/
  └── 2025-04-02/
      ├── home/
      │   └── page.pdf
      ├── about_us/
      │   └── page.pdf
      └── contact/
          └── page.pdf
📌 License
MIT License

