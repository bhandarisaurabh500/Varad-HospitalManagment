const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const photosDir = 'd:\\Varad Hospital Management System\\frontend\\public\\photos';
const files = fs.readdirSync(photosDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

async function run() {
  const results = [];
  for (const file of files) {
    const filePath = path.join(photosDir, file);
    try {
      console.log(`Scanning ${file}...`);
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng+mar', {
        logger: m => {} 
      });
      results.push({ file, text: text.trim() });
    } catch (e) {
      console.error(`Error on ${file}:`, e.message);
      results.push({ file, error: e.message });
    }
  }
  fs.writeFileSync('ocr_results.json', JSON.stringify(results, null, 2));
  console.log('Finished. Wrote to ocr_results.json');
}
run();
