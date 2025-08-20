const { JSONFilePreset } = require('lowdb/node');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db.json');


const defaultData = { logoUrl: "", Users: [], CWL: [] }

async function addPlayers(wpName, wpNumber, cocId) {
    const db = await JSONFilePreset(dbPath, defaultData)
    await db.read();
    const newPlayer = { wpName, wpNumber, cocId };
    db.data.Users.push(newPlayer);
    await db.write();
}

async function updatePlayers(wpName, wpNumber, cocId) {
    const db = await JSONFilePreset(dbPath, defaultData);
    await db.read();
    const userIndex = db.data.Users.findIndex(user => user.cocId === cocId);
    if (userIndex !== -1) {
        db.data.Users[userIndex] = { wpName, wpNumber, cocId };
        await db.write();
    }
}

async function deletePlayers(cocId) {
    const db = await JSONFilePreset(dbPath, defaultData);
    await db.read();
    db.data.Users = db.data.Users.filter(user => user.cocId !== cocId);
    await db.write();
}

module.exports = { addPlayers, updatePlayers, deletePlayers };