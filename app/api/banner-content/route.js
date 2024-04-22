import puppeteer from 'puppeteer';

export async function GET() {
    
    const data = await getBannerContent();
    return Response.json({ data });
}

async function getBannerContent(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    try {
      
        await page.goto('https://sabc-plus.com');

        // Adjust selectors based on the website structure
        const heroSliderImg = await page.waitForSelector('.HeroSlider-img');
        const anchorTag = await heroSliderImg.$('a');
        const imageElement = await anchorTag.$('img');
    
        if (imageElement) {
          const imgSrc = await imageElement.evaluate(img => img.getAttribute('src'));
          return { imgSrc };
        } else {
          return {}; // Return empty object if image not found
        }
      
  
      
    } catch (error) {
      console.error('error on the backend api', error);
      return {}; // Return empty object on error
    } finally {
      await browser.close();
    }
  }
  
  