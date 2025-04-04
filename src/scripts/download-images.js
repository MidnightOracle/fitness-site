import fs from 'fs';
import path from 'path';
import axios from 'axios';

const https = require('https');

const images = {
  'hero.jpg': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200', // meditation sunset
  'yoga-golf.jpg': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', // yoga
  'aqua-fitness.jpg': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800', // pool
  'dance-fit.jpg': 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800', // dance
  'gallery-1.jpg': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200', // group fitness
  'nutrition.jpg': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800', // healthy food
  'yoga.jpg': 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=800', // yoga pose
  'swimming.jpg': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800', // swimming
  'victoria.jpg': 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800', // trainer
};

const downloadImage = (url, filename) => {
  const filepath = path.join(__dirname, '../../public/images', filename);
  const file = fs.createWriteStream(filepath);

  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filepath);
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download all images
Object.entries(images).forEach(([filename, url]) => {
  downloadImage(url, filename);
}); 