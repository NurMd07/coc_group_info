const axios = require("axios");
const { pipeline } = require("stream/promises")
const fs = require("fs");
const path = require('path');
const { JSONFilePreset } = require('lowdb/node');

const dbPath = path.join(__dirname, '..', 'db.json');

require('dotenv').config();

const { COC_API_KEY, COC_API_URL } = process.env;

const logoDir = path.join(__dirname, '..', 'public', 'images');

const defaultData = { clanInfo:[], Users: [], CWL: [] }

async function downloadLogo(clanId ) {
  try {

    const db = await JSONFilePreset(dbPath, defaultData)
    await db.read();
    if(db.data.clanInfo.some(clan=> (clan.id === clanId ) && Date.now() - clan.timeStamp < 1000 * 60  )) return;

    const apiResponse = await axios({
      method: 'GET',
      url: `${COC_API_URL}${clanId}`,
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

await db.read(); 
const clanIndex = db.data.clanInfo.findIndex(clan=>clan.id===clanId);
if(clanIndex !== -1){
  db.data.clanInfo[clanIndex].logoUrl = imgName;
  db.data.clanInfo[clanIndex].timeStamp = Date.now();
}else{
    db.data.clanInfo.push({id:clanId,logoUrl:imgName,timeStamp:Date.now()})
}
    await db.write();
  } catch (err) {
    console.log(err)
  }
  return COC_API_URL
}

module.exports = downloadLogo;