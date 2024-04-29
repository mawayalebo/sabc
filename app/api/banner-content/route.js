import puppeteer from 'puppeteer';

export async function GET() {
  const movieData = await scrapeMovieData('https://sabc-plus.com/catchup'); // Replace with actual URL
  return Response.json({ data: movieData });
}

async function scrapeMovieData(url) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    // Find all anchor tags with the desired class
    const movieAnchors = await page.$$('a.movies-slide-img');

    const scrapedMovies = [];
    for (const movieAnchor of movieAnchors) {
      const movieData = {};

      // Extract href and image src (if available)
      movieData.href = await movieAnchor.evaluate(anchor => anchor.getAttribute('href'));
      const movieImage = await movieAnchor.$('img');
      if (movieImage) {
        movieData.src = await movieImage.evaluate(img => img.getAttribute('src'));
      }

      // Find 'show-details' div and extract title
      const showDetails = await movieAnchor.nextSibling('div.show-details');
      if (showDetails) {
        movieData.title = await showDetails.$eval('h6', h6 => h6.textContent.trim());
      }

      // Find 'category' div and extract category
      const categoryDiv = await showDetails.nextSibling('div.category');
      if (categoryDiv) {
        movieData.category = await categoryDiv.$eval('span', span => span.textContent.trim());
      }

      // Find 'other' div and extract PEGI and quality (if available)
      const otherDiv = await categoryDiv.nextSibling('div.other');
      if (otherDiv) {
        const otherSpans = await otherDiv.$$('span');
        movieData.pegi = null;
        movieData.quality = null;
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
