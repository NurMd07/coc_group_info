
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
const clanLogo = document.querySelector('.clanlogo');

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

const clanDataCache = {};

async function fetchClanData(clanId) {
  try {
    if (clanDataCache[clanId]) {
      return clanDataCache[clanId];
    }
    const clanData = await axios.get(`/clandata?clanid=${clanId}`);

    clanData.data.memberList.sort((a, b) => b.trophies - a.trophies);
   
    clanDataCache[clanId] = {
      clanLogoUrl: clanData.data.localLogoUrl || 'coc-logo.png',
      cwlLeagueImg: clanData.data.cwlLogo || '',
      cwlLeagueName: clanData.data.warLeague.name || '',
      membersCount: clanData.data.members || 0,
      trophiesCount: clanData.data.clanPoints || 0,
      memberList: clanData.data.memberList || [],
      wpMemberCountValue: clanData.data.memberList.length || 0
    };
    return clanDataCache[clanId];

  } catch (error) {
    console.error('Error fetching clan data:', error);
  }
}


const clans = [{ id: "QU0LCQP2", name: "Legendary Crew ™" }, { id: "2RYLVCC8Y", name: "Mighty Souls" }]; // Add more clan IDs as needed

//home
const homeContainer = document.querySelector('.home');

const clansContainer = document.querySelector('.clans');

//page
const clanPage = document.querySelector('.clan_page');

let activeClanId = clans[0].id; // Default to the first clan

async function displayClans() {


  clans.forEach(clan => {
    const clanId = clan.id;
    const fetchedClanName = clan.name;

    const loader = document.createElement('div');
    loader.classList.add('loader1');

    const clanDiv = document.createElement('div');
    clanDiv.classList.add('clan_div');
    clanDiv.dataset.clanId = clanId;

    const headerImg = document.createElement('img');
    headerImg.classList.add('clan_div_clanlogo');


    const clanName = document.createElement('p');
    clanName.classList.add('clan-name');
    clanName.textContent = fetchedClanName;

    clanDiv.append(headerImg, clanName);

    const clanInfoDiv = document.createElement('div');
    clanInfoDiv.classList.add('clan_info');

    const membersDiv = document.createElement('div');
    membersDiv.classList.add('members');

    const membersSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    membersSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    membersSvg.setAttribute("viewBox", "0 0 24 24");
    membersSvg.setAttribute("fill", "currentColor");
    membersSvg.innerHTML = `<path
                d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
              ></path>`

    const membersCountValue = document.createElement('span');
    membersCountValue.classList.add('members_count');
    membersCountValue.appendChild(loader.cloneNode(true));

    membersDiv.append(membersSvg, membersCountValue);

    const clanWpMemebersDiv = document.createElement('div');
    clanWpMemebersDiv.classList.add('clan_wp_members');

    const clanWpMembersSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    clanWpMembersSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clanWpMembersSvg.setAttribute("viewBox", "0 0 16 16");
    clanWpMembersSvg.setAttribute("fill", "currentColor");
    clanWpMembersSvg.innerHTML = `<path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>`


    const clanWpMembersCount = document.createElement('span');
    clanWpMembersCount.classList.add('clan_wp_members_count');
    clanWpMembersCount.appendChild(loader.cloneNode(true));

    clanWpMemebersDiv.append(clanWpMembersSvg, clanWpMembersCount);

    const trophiesDiv = document.createElement('div');
    trophiesDiv.classList.add('trophies');

    const trophiesImg = document.createElement('img');
    trophiesImg.src = "/images/trophy.png"


    const trophiesCountValue = document.createElement('span');
    trophiesCountValue.classList.add('trophies_count');
    trophiesCountValue.appendChild(loader.cloneNode(true));

    trophiesDiv.append(trophiesImg, trophiesCountValue);

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('tag');

    const tagSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tagSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    tagSvg.setAttribute("viewBox", "0 0 24 24");
    tagSvg.setAttribute("fill", "currentColor");
    tagSvg.innerHTML = `<path
                d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z"
              ></path>`

    const homeTagValue = document.createElement('span');
    homeTagValue.classList.add('tag_value');
    homeTagValue.textContent = clanId;



    tagDiv.append(tagSvg, homeTagValue);

    clanInfoDiv.append(membersDiv, clanWpMemebersDiv, trophiesDiv, tagDiv);

    clanDiv.appendChild(clanInfoDiv);

    clansContainer.appendChild(clanDiv);

    fetchClanData(clanId).then(clanData => {
      membersCountValue.textContent = clanData.membersCount;
      clanWpMembersCount.textContent = clanData.wpMemberCountValue;
      trophiesCountValue.textContent = clanData.trophiesCount;
      headerImg.src = `/images/${clanData.clanLogoUrl}`;
      if (activeClanId === clanId) {
        displayClanInfo(clanId);
      }
    })
  });
}

displayClans();

function displayClanInfo(clanId) {
  const clanData = clanDataCache[clanId];

  if (!clanData) return;

  const storedClanName = clans.find(clan => clan.id === clanId);

  cwlLeagueImg.src = `/images/cwl/${clanData.cwlLeagueImg}`;
  cwlLeagueName.textContent = clanData.cwlLeagueName;
  membersCount.textContent = clanData.membersCount;
  trophiesCount.textContent = clanData.trophiesCount;
  wpMemberCountValue.textContent = clanData.wpMemberCountValue;
  titleHeading.textContent = storedClanName ? storedClanName.name : 'Legendary Crew™';
  tagValue.textContent = `#${clanId}`;
  clanLogo.src = `/images/${clanData.clanLogoUrl}`;

  let index = 1;
  groupContent.innerHTML = ''; // Clear previous members
  const sortedMembers = [...clanData.memberList].sort((a, b) =>  a.clanRank - b.clanRank);
  sortedMembers.forEach(player => {
    listPlayers(player.wpName, player.wpNumber, player.name, player.expLevel, player.role, player.townHallLevel, index)
    index++;
  });
}


const clanDiv = document.querySelectorAll('.clan_div');
const backHome = document.querySelector('.back-home');

clanDiv.forEach(div => {
  div.addEventListener('click', () => {

    const clanId = div.dataset.clanId;
    activeClanId = clanId;
    const clanName = clans.find(clan => clan.id === clanId).name;
    titleHeading.textContent = clanName;
    if (clanId === "QU0LCQP2") {

      titleHeading.classList.add('text-gradient-yellowshade');
      titleHeading.classList.remove('text-gradient-yellowred');
      backHome.style = "--i:  #f4c430;--j:#ffdb58"
    } else {
      titleHeading.classList.remove('text-gradient-yellowshade');
      titleHeading.classList.add('text-gradient-yellowred');
      backHome.style = "--i:#FF9966;--j:#FF5E62"
    }


    displayClanInfo(clanId);
    setTimeout(() => {
      document.body.style.backgroundPosition = "10%";
      homeContainer.classList.add('hide');
      clanPage.classList.remove('hide');
    }, 200);
  });
});



backHome.addEventListener('click', () => {

  setTimeout(() => {
    document.body.style.backgroundPosition = "80%";
    clanPage.classList.add('hide');
    homeContainer.classList.remove('hide');
  }, 300);
});



// snowflakes animation


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
