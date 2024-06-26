import puppeteer from 'puppeteer';

export async function GET() {
  const movieData = await scrapeMovieData('https://sabc-plus.com/catchup');
  return Response.json({ data: movieData });
}


async function scrapeMovieData(url) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

  

    await page.goto(url);
    let pageNumber = 2;
    let targetAnchor = await page.waitForSelector(`a[data-page="${pageNumber}"]`);
    // Loop to scroll and check for target anchor
    while (targetAnchor) {
      
        // Found target anchor, proceed with scraping
        console.log(`Found anchor tag with data-page: ${pageNumber}`);
        targetAnchor = await page.waitForSelector(`a[data-page="${pageNumber}"]`);
        const previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
        await new Promise((resolve)=> setTimeout(resolve,100));
        
        pageNumber ++
        
        if( pageNumber == 5){
          break;
        }
        
    }

    console.log('fire last');
    // Find the container element
        const dataContainer = await page.waitForSelector('ul#data-container');
        if (!dataContainer) {
         console.warn(`Could not find container element with ID 'data-container' on ${url}`);
         return []; // Return empty array if not found
        }
        console.log('i shouldnt fire first')
    
        // Find all list items within the container
        const movieListItems = await dataContainer.$$('li');
    
        const scrapedMovies = [];
        for (const movieListItem of movieListItems) {
        const movieData = {};
    
          // Find the desired elements within each list item
          const movieAnchor = await movieListItem.$('.movies-slide-img');
          if (movieAnchor) {
           movieData.href = await movieAnchor.evaluate(anchor => anchor.getAttribute('href'));
           const movieImage = await movieAnchor.$('img');
          if (movieImage) {
             movieData.src = await movieImage.evaluate(img => img.getAttribute('src'));
           }
          }
    
            const showDetails = await movieListItem.$('.show-details');
            if (showDetails) {
            movieData.title = await showDetails.$eval('h6', h6 => h6.textContent.trim());
            const categorySpan = await showDetails.$eval('.category span', span => span.textContent.trim());
            if (categorySpan) {
             movieData.category = categorySpan;
            }
            const otherSpans = await showDetails.$$('.other span');
            for (const span of otherSpans) {
             const spanClass = await span.evaluate(span => span.getAttribute('class').split(' '));
            if (spanClass.includes('pegi')) {
               movieData.pegi = await span.evaluate(span => span.textContent.trim());
              } else if (spanClass.includes('quality')) {
               movieData.quality = await span.evaluate(span => span.textContent.trim());
             }
            }
        }
    
        scrapedMovies.push(movieData);
      }
    
        await browser.close();
        return scrapedMovies;

    
      
 
  } catch (error) {
    console.error('error on the backend api', error);
    return []; // Return empty array on error
  }
}
