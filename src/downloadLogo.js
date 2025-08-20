const axios = require("axios");
const { pipeline } = require("stream/promises")
const fs = require("fs");
const path = require('path');
const { JSONFilePreset } = require('lowdb/node');
const dbPath = path.join(__dirname, '..', 'db.json');

require('dotenv').config();

const { COC_API_KEY, COC_API_URL } = process.env;

const logoDir = path.join(__dirname, '..', 'public', 'images');

const defaultData = { logoUrl: "", Users: [], CWL: [] }

async function downloadLogo() {
  try {
    const db = await JSONFilePreset(dbPath, defaultData)
    const apiResponse = await axios({
      method: 'GET',
      url: COC_API_URL,
      headers: {
        'Authorization': `Bearer ${COC_API_KEY}`
      }
    })

    const imgUrl = apiResponse.data.badgeUrls.medium;

    const imgName = path.basename(imgUrl);
    const imgPath = path.join(logoDir, imgName)
    const response = await axios(
      {
        method: 'GET',
        url: imgUrl,
        responseType: 'stream'
      })

    const writer = fs.createWriteStream(imgPath)

    await pipeline(response.data, writer);

    const favicon = apiResponse.data.badgeUrls.small;
    const faviconPath = path.join(logoDir, 'favicon.png');
    const response1 = await axios(
      {
        method: 'GET',
        url: favicon,
        responseType: 'stream'
      })

    const writer1 = fs.createWriteStream(faviconPath)

    await pipeline(response1.data, writer1);


    db.data.logoUrl = imgName;
    await db.write();
  } catch (err) {
    console.log(err)
  }
  return COC_API_URL
}

module.exports = downloadLogo;