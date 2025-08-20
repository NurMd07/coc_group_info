
const cwlLeagueImg = document.querySelector('.cwl_league img');
const cwlLeagueName = document.querySelector('.cwl_league .cwl_league_name');
const membersCount = document.querySelector('.members_count');
const trophiesCount = document.querySelector('.trophies_count');
const groupContent = document.querySelector('.group_content');
const wpMemberCountValue = document.querySelector('.wp_member_count_value');
const titleHeading = document.querySelector('.title h1');
const cocLogoImage = document.querySelector('.coc_logo img');
const tagValue = document.querySelector('.tag_value');
const groupFooterLeft = document.querySelector('.group_footer_left');
const ldsFacebook = document.querySelector('.lds-facebook');


function listPlayers(wpNameValue, wpNumberValue, cocNameValue, cocXpValue, cocRoleValue, thLevel, index) {
  const li = document.createElement('li');
  const column1 = document.createElement('div');
  const column2 = document.createElement('div');
  const column3 = document.createElement('div');

  const listItemNumber = document.createElement('span');
  const wpName = document.createElement('span');
  const wpNumber = document.createElement('span');

  listItemNumber.classList.add('list_item_number');
  wpName.classList.add('wp_name');
  wpNumber.classList.add('wp_number');



  listItemNumber.textContent = index;
  wpName.textContent = wpNameValue || 'Unknown?';
  wpNumber.textContent = `(${wpNumberValue})` || '+?';

  column3.appendChild(listItemNumber);
  column1.appendChild(wpName);
  column1.appendChild(wpNumber);

  const dash = document.createElement('span');

  dash.textContent = ' - ';

  column2.appendChild(dash);

  const cocName = document.createElement('span');
  const thIcon = document.createElement('img');

  cocName.classList.add('coc_name');
  thIcon.classList.add('th_icon');
  cocName.textContent = cocNameValue || 'Unknown?';

  thIcon.src = `/images/townhalls/th-${thLevel}.png`;

  column3.appendChild(cocName);
  column3.appendChild(thIcon);

  const cocInfo = document.createElement('div');
  cocInfo.classList.add('coc_info');
  const cocXpDiv = document.createElement('div');
  const cocXpImg = document.createElement('img');
  const cocXp = document.createElement('span');
  const cocRole = document.createElement('span');
  cocRole.classList.add('coc_role');


  if (cocRoleValue === "leader") {
    cocRole.style.color = 'gold';
    cocRoleValue = 'Leader';
  } else if (cocRoleValue === "coLeader") {
    cocRole.style.color = '#dc4545f9';
    cocRoleValue = 'Co-Leader';
  } else if (cocRoleValue === "admin") {
    cocRole.style.color = 'darkorange';
    cocRoleValue = 'Elder';
  } else {
    cocRole.style.color = 'white';
    cocRoleValue = 'Member';
  }

  cocRole.textContent = `${cocRoleValue}` || 'Member';

  cocXpDiv.classList.add('coc_xp');
  cocXp.classList.add('coc_xp_value');
  cocXpImg.classList.add('coc_xp_img');
  cocXpImg.src = '/images/xp.png';

  cocXp.textContent = cocXpValue || '?';


  cocXpDiv.appendChild(cocXpImg);
  cocXpDiv.appendChild(cocXp);

  cocInfo.appendChild(cocXpDiv);
  cocInfo.appendChild(cocRole);
  column3.appendChild(cocInfo);



  li.classList.add('list_item');
  column1.classList.add('list_item_column1');
  column2.classList.add('list_item_column2');
  column3.classList.add('list_item_column3');



  li.appendChild(column3);
  li.appendChild(column2);
  li.appendChild(column1);
  groupContent.classList.remove('loader');
  ldsFacebook.classList.add('hide');
  groupContent.appendChild(li);
}

async function fetchClanData() {
  try {
    const clanData = await axios.get('/clandata');
    cwlLeagueImg.src = `/images/cwl/${clanData.data.cwlLogo}` || '';
    cwlLeagueName.textContent = clanData.data.warLeague.name || '';
    membersCount.textContent = clanData.data.members || 0;
    trophiesCount.textContent = clanData.data.clanPoints || 0;
    index = 1;

    clanData.data.memberList.sort((a, b) => b.trophies - a.trophies);

    clanData.data.memberList.forEach(player => {
      listPlayers(player.wpName, player.wpNumber, player.name, player.expLevel, player.role, player.townHallLevel, index)
      index++;
    });
    wpMemberCountValue.textContent = clanData.data.memberList.length || 0;
  } catch (error) {
    console.error('Error fetching clan data:', error);
  }
}

const numFlakes = 20;

function createFlake() {
  const flake = document.createElement("div");
  flake.classList.add("snowflake");

  // random size
  const size = Math.random() * 4 + 2; // 2–6px
  flake.style.width = flake.style.height = size + "px";

  // pick a random edge to spawn from
  const edge = Math.floor(Math.random() * 4);
  let startX, startY;
  if (edge === 0) { // top
    startX = Math.random() * 100;
    startY = -5;
  } else if (edge === 1) { // right
    startX = 105;
    startY = Math.random() * 100;
  } else if (edge === 2) { // bottom
    startX = Math.random() * 100;
    startY = 105;
  } else { // left
    startX = -5;
    startY = Math.random() * 100;
  }

  flake.style.left = startX + "vw";
  flake.style.top = startY + "vh";

  document.body.appendChild(flake);

  // choose a random end point (somewhere offscreen opposite side)
  const endX = Math.random() * 100;
  const endY = Math.random() * 100;

  const duration = Math.random() * 15 + 10; // 10–25s

  // animate with Web Animations API
  flake.animate([
    { transform: "translate(0,0)", opacity: 1 },
    { transform: `translate(${endX - startX}vw, ${endY - startY}vh)`, opacity: 0.6 }
  ], {
    duration: duration * 1000,
    easing: "linear"
  }).onfinish = () => {
    flake.remove();
    createFlake(); // respawn a new one
  };
}

// start a bunch of flakes
for (let i = 0; i < numFlakes; i++) {
  setTimeout(createFlake, i * 500);
}

titleHeading.addEventListener('click', () => {
  window.location.reload();
});

cocLogoImage.addEventListener('click', () => {
  window.location.href = "https://link.clashofclans.com/en/?action=OpenClanProfile&tag=%23QU0LCQP2";
});

tagValue.addEventListener('click', () => {
  navigator.clipboard.writeText(`#${tagValue.textContent.trim()}`);
});

groupFooterLeft.addEventListener('click', () => {
  window.location.href = "/modify"
});


fetchClanData();