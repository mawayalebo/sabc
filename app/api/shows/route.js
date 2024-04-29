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

    // Simulate scrolling (adjust values as needed)
    await page.evaluate(() => {
      window.scrollBy(0, 1000); // Scroll down 1000 pixels
      window.scrollBy(0, -500); // Scroll back up 500 pixels
    });

    // Find the container element
    const dataContainer = await page.waitForSelector('ul#data-container');
    if (!dataContainer) {
      console.warn(`Could not find container element with ID 'data-container' on ${url}`);
      return []; // Return empty array if not found
    }

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
