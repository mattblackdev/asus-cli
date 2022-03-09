import { Command } from "commander";
import puppeteer from "puppeteer";
import { login, wireless } from "./pages";

const program = new Command()
  .name("asus")
  .description("🧙 Control your Asus Router 🧙")
  .option("--headless", "Run without opening the browser")
  .version("1.0.0");
program.command("on").description("Turn wifi on").action(toggleWifi);
program.command("off").description("Turn wifi off").action(toggleWifi);

export async function cli() {
  await program.parseAsync(process.argv);
}

async function makePage(browser) {
  const page = await browser.newPage();
  const bigClick = (selector) =>
    Promise.all([page.waitForNavigation(), page.click(selector)]);
  const bigSelect = (selector, value) =>
    Promise.all([page.waitForNavigation(), page.select(selector, value)]);
  return {
    ...page,
    page,
    bigClick,
    bigSelect,
  };
}

async function toggleWifi(_, cmd) {
  const { headless = false } = program.opts();
  const browser = await puppeteer.launch({ headless });
  const { page, bigClick, bigSelect } = await makePage(browser);

  const on = cmd.name() === "on";
  const toggle = on ? wireless.enable : wireless.disable;
  const verb = on ? "En" : "Dis";
  const sigh = on ? "!" : "o";

  console.log(`Asuhhh ${login.un}!`);
  await page.goto(login.url);
  await page.type(login.username, login.un);
  await page.type(login.password, login.pw);
  await bigClick(login.submit);

  console.log(`${verb}abling 2.4 GHz...`);
  await page.goto(wireless.url);
  await bigSelect(wireless.band, wireless.band_24g);
  await page.click(toggle);
  await bigClick(wireless.apply);

  console.log(`${verb}abling 5 Ggg...`);
  await bigSelect(wireless.band, wireless.band_5g);
  await page.click(toggle);
  await bigClick(wireless.apply);

  console.log(`(_${sigh}_) WiFi ${verb}abled (_${sigh}_)`);
  await browser.close();
}
