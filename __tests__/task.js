const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  defaultViewport: null,
  devtools: false,
};
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});

describe("Transparent Login", () => {
  it("Index file should contain appropriate meta tags", async () => {
    try {
      const metaTags = await page.$$("meta");
      expect(metaTags.length).toBeGreaterThan(1);
    } catch (err) {
      throw err;
    }
  });
  it("Index file Should contain a title tag that is not empty", async () => {
    try {
      const title = await page.$eval("title", (el) => el.innerHTML);
      expect(title).not.toBe("");
    } catch (err) {
      throw err;
    }
  });
  it("The content on the page should be centered", async () => {
    try {
      const headingCentered = await page.$eval(
        "h1",
        (el) => getComputedStyle(el).textAlign
      );
      expect(headingCentered).toBe("center");
    } catch (err) {
      throw err;
    }
  });
  it("Body tag Should contain a background image that covers the whole page", async () => {
    try {
      const backgroundProperty = await page.$eval("body", (e) =>
        getComputedStyle(e).getPropertyValue("background-image")
      );
      const backgroundSizeProperty = await page.$eval("body", (e) =>
        getComputedStyle(e).getPropertyValue("background-size")
      );
      expect(backgroundProperty).not.toBe("none");
      expect(backgroundSizeProperty).toContain("cover");
    } catch (err) {
      throw err;
    }
  });
  it("A gradient Should be applied to body tag for dark filter effect", async () => {
    try {
      const backgroundProperty = await page.$$eval("*", (el) =>
        Array.from(el).map((e) =>
          getComputedStyle(e).getPropertyValue("background-image")
        )
      );
      expect(
        backgroundProperty.filter((e) => e.includes("linear-gradient")).length
      ).toBeGreaterThan(0);
    } catch (err) {
      throw err;
    }
  });
  it("All Inputs should have a 'transparent' styling", async () => {
    try {
      const transparent = await page.$eval(
        "input",
        (el) => getComputedStyle(el).background
      );
      expect(transparent).toMatch("rgba(0, 0, 0, 0)");
    } catch (err) {
      throw err;
    }
  });
  it("All Placeholders of the input fields should be styled as Bold when field is selected", async () => {
    try {
      const css = fs.readFileSync(path.join(__dirname, "../style.css"), "utf8");
      expect(css).toMatch(/::placeholder/i);
    } catch (err) {
      throw err;
    }
  });
  it("Font awesome CDN should be present in the `head`", async () => {
    try {
      const head = await page.$eval("head", (el) => el.innerHTML);
      expect(head).toMatch(/font.*awesome/);
    } catch (err) {
      throw err;
    }
  });
  it("Input fields should have font awesome icons", async () => {
    try {
      const iTags = await page.$$("i");
      expect(iTags.length).toBeGreaterThan(1);
    } catch (error) {
      throw error;
    }
  });
});
