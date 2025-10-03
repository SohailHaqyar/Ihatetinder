const puppeteer = require('puppeteer-core');

async function connectAndAutomateChrome() {
  let browser;
  let intervalId;

  try {
    // Connect to existing Chrome instance
    browser = await puppeteer.connect({
      browserURL: 'http://localhost:8989',
    });

    const pages = await browser.pages();
    const page = pages[0] || await browser.newPage();

    // Navigate to Tinder
    await page.goto('https://tinder.com/app/recs');

    // Set viewport to match screen size
    const dimensions = await page.evaluate(() => {
      return {
        width: screen.width,
        height: screen.height,
      };
    });
    await page.setViewport(dimensions);

    console.log('Connected to Chrome. Pressing right arrow every second...');

    // Press right arrow every second
    intervalId = setInterval(async () => {
      try {
        await page.keyboard.press('ArrowRight');
        console.log('Pressed right arrow');
      } catch (error) {
        console.error('Error pressing key:', error.message);
      }
    }, 500);

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\nShutting down gracefully...');
      if (intervalId) clearInterval(intervalId);
      if (browser) await browser.disconnect();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to connect to Chrome:', error.message);
    if (intervalId) clearInterval(intervalId);
    if (browser) await browser.disconnect();
    process.exit(1);
  }
}

connectAndAutomateChrome();
