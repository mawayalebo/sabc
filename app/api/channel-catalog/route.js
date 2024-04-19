import puppeteer from 'puppeteer';

export async function GET() {
    
    const data = await getChannelCatalogue();
    return Response.json({ data });
}

async function getChannelCatalogue(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    try {
      await page.goto('https://sabc-plus.com/');
  
      const data = await page.evaluate(() => {
        const sliderElements = document.querySelectorAll('.common-slider-inner');
        const contentData = []; // Initialize empty array
  
        sliderElements.forEach((slider) => {
          const titleElement = slider.querySelector('.title h2');
          const tvListElement = slider.querySelector('.all-tv-list');
  
          if (titleElement && tvListElement) {
            const showList = [];
  
            const owlItems = tvListElement.querySelectorAll('.owl-item');
  
            owlItems.forEach((owlItem) => {
              const anchorElement = owlItem.querySelector('li a');
              const imageElement = owlItem.querySelector('li a img');
  
              if (anchorElement && imageElement) {
                showList.push({
                  href: anchorElement.getAttribute('href'),
                  imgSource: imageElement.getAttribute('data-src'),
                });
              }
              console.log('showList inside loop:', showList); // Log showList for inspection
            });
  
            console.log('showList before push:', showList); // Log showList before pushing to contentData
  
            contentData.push({
              title: titleElement.textContent.trim(),
              list: showList,
            });
  
            console.log('contentData after push:', contentData); // Log contentData for inspection
          }
        });
  
        return contentData;
      });
  
      return data;
    } catch (error) {
      console.error('error on the backend api', error);
      return {}; // Return empty object on error
    } finally {
      await browser.close();
    }
  }
  
  