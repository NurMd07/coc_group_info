const path = require('path');
const express = require('express');
const axios = require('axios');
const downloadLogo = require('./src/downloadLogo.js');
const { addPlayers, updatePlayers, deletePlayers } = require('./src/mapPlayers.js');
const { JSONFilePreset } = require('lowdb/node');

require('dotenv').config({ quiet: true });

const { PORT, COC_API_KEY, COC_API_URL, WHATSAPP_GROUP_LINK, JOIN_CODE } = process.env;
const defaultData = { clanInfo: [], Users: [], CWL: [] };

const app = express();
let db;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

function checkAccess(req, res, next) {
  const adminAccess = req.body.adminAccessValue;

  if (adminAccess === process.env.ADMIN_ACCESS_VALUE) {
    next();
  } else {
    res.render('modify', { error: 'Access Denied! Incorrect Admin Access Value. Try again?' });
  }
}

// Page routes
app.get('/', async (req, res) => {
  const logoUrl = db.data.logoUrl;
  res.render('index', { error: null, logoUrl });
});

app.get('/modify', async (req, res) => {
  res.render('modify', { error: null });
});

app.post('/join', (req, res) => {
  const logoUrl = db.data.logoUrl;
  const { code } = req.body;

  if (code === JOIN_CODE) {
    res.redirect(WHATSAPP_GROUP_LINK);
  } else {
    res.render('index', { error: 'Incorrect code. Try again!', logoUrl });
  }
});

// Clan data API
app.get('/clandata', async (req, res) => {
  const clanId = req.query.clanid || null;

  try {
    const apiResponse = await axios({
      method: 'GET',
      url: `${COC_API_URL}${clanId}`,
      headers: {
        Authorization: `Bearer ${COC_API_KEY}`
      }
    });

    if (apiResponse.status !== 200) {
      throw new Error('Failed to fetch data from Clash of Clans API');
    }

    await downloadLogo(clanId);
    await db.read();

    const cwlLeague = await db.data.CWL.find(
      item => item.name === apiResponse.data.warLeague.name
    );
    apiResponse.data.cwlLogo = cwlLeague ? cwlLeague.logo : null;

    const clan = db.data.clanInfo.find(clan => clan.id === clanId);
    apiResponse.data.localLogoUrl = clan.logoUrl || null;

    const mappedPlayers = await db.data.Users;
    apiResponse.data.memberList = mappedPlayers
      .map(player => {
        const member = apiResponse.data.memberList.find(
          item => item.tag === player.cocId
        );

        if (member) {
          return { wpName: player.wpName, wpNumber: player.wpNumber, ...member };
        }
      })
      .filter(value => value !== undefined);

    res.json(apiResponse.data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching clan data');
  }
});

// Admin routes
app.post('/add', checkAccess, async (req, res) => {
  const { wpName, wpNumber, cocId } = req.body;
  await addPlayers(wpName, wpNumber, cocId);
  res.redirect('/');
});

app.post('/update', checkAccess, async (req, res) => {
  const { wpName, wpNumber, cocId } = req.body;
  await updatePlayers(wpName, wpNumber, cocId);
  res.redirect('/');
});

app.post('/delete', checkAccess, async (req, res) => {
  const { cocId } = req.body;
  await deletePlayers(cocId);
  res.redirect('/');
});

async function start() {
  db = await JSONFilePreset('db.json', defaultData);

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });

  setInterval(() => {
    console.log('Server alive at', new Date().toISOString());
  }, 60000);
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
