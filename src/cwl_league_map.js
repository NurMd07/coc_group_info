const { JSONFilePreset } = require('lowdb/node');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db.json');
let db;

const defaultData = { logoUrl: "", Users: [], CWL: [] }

async function mapCwlLeages() {
  try {
    db = await JSONFilePreset(dbPath, defaultData)
    db.data.CWL.push(
      {
        "id": 48000010,
        "name": "Crystal League III",
        "logo": "WarCrystalIII_64x64.png"
      },
      {
        "id": 48000011,
        "name": "Crystal League II",
        "logo": "WarCrystalII_64x64.png"
      },
      {
        "id": 48000012,
        "name": "Crystal League I",
        "logo": "WarCrystalI_64x64.png"
      },
      {
        "id": 48000013,
        "name": "Master League III",
        "logo": "WarMasterIII_64x64.png"
      },
      {
        "id": 48000014,
        "name": "Master League II",
        "logo": "WarMasterII_64x64.png"
      },
      {
        "id": 48000015,
        "name": "Master League I",
        "logo": "WarMasterI_64x64.png"
      },
      {
        "id": 48000016,
        "name": "Champion League III",
        "logo": "WarChampionIII_64x64.png"
      },
      {
        "id": 48000017,
        "name": "Champion League II",
        "logo": "WarChampionII_64x64.png"
      },
      {
        "id": 48000018,
        "name": "Champion League I",
        "logo": "WarChampionI_64x64.png"
      }
    );
    await db.write()
  } catch (e) {
    console.log(e);
  }
}
mapCwlLeages();