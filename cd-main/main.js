let canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d')

const x = canvas.width / 2;
const y = innerHeight / 2;

let winnable = false;
let won = false;

let rows = 0;

let time = 0;

let speed = 20;
let pierce = 1;
let projlifetime = 50;
let reloadtime = 15;
let enemiesKilled = 0;

let campers = 0;
let SPGunits = 0;
let SACunits = 0;
let YACunits = 0;
let LTunits = 0;
let leaderunits = 0;
let staffunits = 0;
let a4 = false;
let strengthunits = 0;
let patunits = 0;
let farmunits = 0;
let caveunits = 0;
let compressunits = 0;
let mineunits = 0;
let pressurizerunits = 0;
let windspireunits = 0;
let campfireunits = 0;
let magmaunits = 0;
let volcanounits = 0;
let beaconunits = 0;

let coordination = 0;

let intropage = 0;
let empowerdesc = 0;
let corruptdesc = 0;
let apocdesc = 0;
let fireunlocked = false;

let upgrades = [];
let upgradeStacks = 0;

let resources = [12341234, 12341234, 12341234, 12341234, 12341234, 12341234, 12341234, 12341234];
let resourceImages = ['./assets/resources/food.png', './assets/resources/wood.png', './assets/resources/stone.png', './assets/resources/copper.png', './assets/resources/titanium.png', './assets/resources/diamond.png', './assets/resources/antimatter.png', './assets/resources/power.png'];
const values = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];

let dead = false;

let homesteadmaxhp = 5000;

let description = null;

let wave = 0;
let wavetimer = 0;

let pause = 0;

let doom = false;

let windMultiplier = 0.8;

let display = "none";
let upgradeDisplay = 0;
let abilityDisplay = 0;

let onMouse = null;

let player = new Player(x, y, 60, 'blue');
let homestead = new Homestead(0, 0, homesteadmaxhp, homesteadmaxhp, './assets/misc/homestead.png');

let SPGBaseCost = [100, 0, 0, 0, 0, 0, 0, 0];
let SACBaseCost = [0, 300, 600, 0, 0, 0, 0, 0];
let YACBaseCost = [0, 0, 1200, 400, 0, 0, 0, 0];
let LTBaseCost = [0, 0, 0, 0, 250, 0, 0, 0];
let leaderBaseCost = [20000, 0, 0, 0, 0, 0, 0, 0];
let staffBaseCost = [1000000, 0, 0, 0, 0, 0, 0, 0];
let patBaseCost = [1000000000000000000, 0, 0, 0, 0, 0, 0, 0];
let farmBaseCost = [1000, 0, 0, 0, 0, 0, 0, 0];
let caveBaseCost = [20000, 60000, 30000, 0, 0, 0, 0, 0];
let compressorBaseCost = [0, 5000000, 1000000, 1000000, 0, 0, 0, 0];
let mineBaseCost = [0, 20000000, 12000000, 7000000, 4000000, 0, 0, 0];
let pressurizerBaseCost = [0, 0, 0, 40000000, 20000000, 9000000, 0, 0];
let windspireBaseCost = [0, 330000, 880000, 0, 99000, 0, 0, 0];
let campfireBaseCost = [0, 6000000, 1000000, 0, 0, 0, 0, 0];
let beaconBaseCost = [0, 0, 40000000000, 0, 5000000000, 1000000000, 0, 0];

let shownUpgrade = null;

let novaTimer = 0;

let globalResourceBoost = 1;
let enemyStrength = 1;
let empowered = false;
let empowerboosted = false;
let corrupted = false;
let corruptboosted = false;
let apocalyptic = false;
let apocboosted = false;

let farmBuff = 1;

let unLagBuff = 1;

let globalPower = 0;
let buffBoost = 0;
let farmBoost = 0;
let duoBoost = 0;
let lumberBoost = 0;
let healthBoost = 0;
let meditationBoost = 0;
let meditationStacks = 0;
let confidenceBoost = 0;
let confidenceStacks = 0;
let spireBoost = 0;
let leechBoost = 0;
let charge = 0;
let advance = false;
let rejuv = false;
let asc = false;
let ascWave = 0;
let leaderBoosted = 0;
let leaderBoost = 1;
let SPGBoost = false;
let SACBoost = false;
let YACBoost = false;
let sportBoost = 0;
let farmdr = 0;
let bellStacks = 0;

let piercechance = 0;

let lrb = false;

let ddamageboost = 1;

let chargeStorage = 0;

let upgradeX;
let upgradeY;

let rTotal;

let campfirePrestige = 0;
let fireLootBuff = 1;

let unitchecked = true;
let farmchecked = true;
let miscchecked = true;
let upgradechecked = true;

let foodNerds = 1;
let woodNerds = 1;
let stoneNerds = 1;
let copperNerds = 1;
let titaniumNerds = 1;
let diamondNerds = 1;
let antimatterNerds = 1;

let farmEff = 1;
let caveEff = 1;
let compEff = 1;
let mineEff = 1;
let pressEff = 1;

let double = false;
let types = false;

let homesteadwarp = 1;

let lootMultiplier = 1;

let LTEff = 1;
let leaderEff = 1;
let experienceStacks = 0;

let displayArray = [unitchecked, farmchecked, miscchecked, upgradechecked];
let selectionArray = ["units", "farming", "misc", "upgrades"];

let oc = 0;

let deathdebuff = false;

let chilled = 1;
let chilltime = 0;
let rncstacks = 0;
let wb = 1;
let wbstacks = 0;
let wbtime = 0;
let absp = 0;
let fc = 1;
let fcstacks = 0;
let fctime = 0;
let mtstacks = 0;
let ht = 1;
let httime = 0;
let htstacks = 0;
let tmstacks = 0;
let eva = 0;
let vap = 0;
let upgradesResearched = 0;
let rsc = 0;
let eng = 0;

let infohover = null;

let songBoost = 0;

let matted = false;

let knockback = 0;

let lengthboost = 1;

let bm = 1;

let implevel = 0;

let reinforcements = new Upgrade("Reinforcements", "All units on screen gain +100% health, including the homestead.", [0, 2500, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/reinforcements0.png', "healthBoost");

let ufarms = [1, 5, 50, 1000, 40000, 3200000];
let ufarmstacks = 0;
let uberfarming2 = new Upgrade("Agricultural Intensification II", "All farming units are a compounding 10 times as efficient.", [200000000, 40000000, 5000000, 0, 0, 0, 0, 0], null, './assets/upgrades/uberfarming2.png', "uberfarmBoost");
let uberfarming = new Upgrade("Agricultural Intensification I", "All farming units are a compounding 5 times as efficient.", [500000, 100000, 0, 0, 0, 0, 0, 0], uberfarming2, './assets/upgrades/uberfarming.png', "uberfarmBoost");

let maat = new Upgrade("The Ma'at", "Increases the damage of all sources based on graverobber count to simulate balance. For every graverobber on screen, all damage will gain a stacking +3% increase, capping at 30 enemies (+90%).", [14000000, 0, 0, 0, 0, 0, 0, 0], null, './assets/upgrades/innovation.png', "maat");
let akh = new Upgrade("The Akh", "All graverobbers lose 10% of their current health if another graverobber dies.", [6000000, 0, 0, 0, 0, 0, 0, 0], maat, './assets/upgrades/inspiration.png', "akh");
let ba = new Upgrade("The Ba", "Half of the graverobbers now spawn with 3x health but with 5x less damage.", [2000000, 0, 0, 0, 0, 0, 0, 0], akh, './assets/upgrades/imagination.png', "ba");
let ka = new Upgrade("The Ka", "The tomb now fires projectiles at enemies, simulating a body double of the pharaoh.", [750000, 0, 0, 0, 0, 0, 0, 0], ba, './assets/upgrades/meditation.png', "ka");

let impale3 = new Upgrade("Impalement III", "+15% damage from all sources and graverobbers get knocked back further when hit.", [5400000, 5400000, 5400000, 0, 0, 0, 0, 0], null, './assets/upgrades/belief.png', "imp");
let impale2 = new Upgrade("Impalement II", "+15% damage from all sources and graverobbers get knocked back further when hit.", [1500000, 1500000, 1500000, 0, 0, 0, 0, 0], impale3, './assets/upgrades/ambition.png', "imp");
let impale = new Upgrade("Impalement I", "+15% damage from all sources and graverobbers get knocked back when hit by Necropolis Guards.", [450000, 450000, 450000, 0, 0, 0, 0, 0], impale2, './assets/upgrades/confidence.png', "imp");

let b4 = new Upgrade("Belligerence IV", "+30% damage from all sources.", [1550000, 0, 0, 1550000, 1525000, 0, 0, 0], null, './assets/upgrades/belligerence.png', "b");
let b3 = new Upgrade("Belligerence III", "+30% damage from all sources.", [550000, 0, 0, 550000, 525000, 0, 0, 0], b4, './assets/upgrades/belligerence.png', "b");
let b2 = new Upgrade("Belligerence II", "+30% damage from all sources.", [150000, 0, 0, 150000, 125000, 0, 0, 0], b3, './assets/upgrades/belligerence.png', "b");
let b = new Upgrade("Belligerence I", "+30% damage from all sources.", [50000, 0, 0, 50000, 25000, 0, 0, 0], b2, './assets/upgrades/belligerence.png', "b");


mousePos = {x:0, y:0};
tileSelect = {m:0, n:0};
addEventListener("mousemove", event => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
    tileSelect.m = Math.floor((player.x - canvas.width / 2 + mousePos.x) / 50) + 1;
    tileSelect.n = Math.floor((player.y - canvas.height / 2 + mousePos.y) / 50) + 1;
    if (event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "units") description = "SPG";
    else if (event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "units") description = "SAC";
    else if (event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "units") description = "YAC";
    else if (event.clientX > 340 && event.clientX < 380 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "units") description = "LT";
	else if (event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && display == "units") description = "leader";
	else if (event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && display == "units" && wave > 24) description = "staff";
	else if (event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && display == "units" && wave > 150) description = "pat";
    else if (event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "farming") description = "farm";
	else if (event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "farming" && wave > 20) description = "cave";
	else if (event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "farming" && wave > 45) description = "compressor";
	else if (event.clientX > 340 && event.clientX < 380 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "farming" && wave > 65) description = "mine";
	else if (event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && display == "farming" && wave > 101) description = "pressurizer";
	else if (event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "misc" && wave > 30 && spireWarped == false) description = "windspire";
	else if (event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "misc" && wave > 90) description = "beacon";
	else if (event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && display == "misc" && wave > 50 && wave <= 150) {
		if (campfirePrestige == 0) description = "campfire";
		if (campfirePrestige == 1) description = "magma";
		if (campfirePrestige == 2) description = "volcano";
	}
    else description = null;
	
	if (event.clientX > 440 && event.clientX < 840 && event.clientY < canvas.height - 67 && event.clientY > canvas.height - rows*50 - 67 && upgradeDisplay % 2 == 1) {
		if (upgrades[upgradeY * 8 + upgradeX]) {
			shownUpgrade = upgrades[upgradeY * 8 + upgradeX];
		} else shownUpgrade = null;
	} else shownUpgrade = null;
	
	if (event.clientX > 440 && event.clientX < 840 && event.clientY < canvas.height - 67 && event.clientY > canvas.height - 117 && abilityDisplay % 2 == 1) {
		abilityIndex = Math.floor((event.clientX - 440)/50);
	} else abilityIndex = null;

	if (event.clientX > canvas.width - 175 && event.clientX < canvas.width - 135 && event.clientY > 30 && event.clientY < 60 && meditationBoost > 0) infohover = "meditation";
	else if (event.clientX > canvas.width - 175 && event.clientX < canvas.width - 135 && event.clientY > 80 && event.clientY < 110 && confidenceBoost > 0) infohover = "confidence";
	else if (event.clientX > canvas.width - 175 && event.clientX < canvas.width - 135 && event.clientY > 130 && event.clientY < 160 && leechBoost == 3) infohover = "charge";
	else if (event.clientX > canvas.width - 175 && event.clientX < canvas.width - 135 && event.clientY > 180 && event.clientY < 210 && experienceStacks > 0) infohover = "experience";
	else if (event.clientX > canvas.width - 175 && event.clientX < canvas.width - 135 && event.clientY > 230 && event.clientY < 260 && lrb == true) infohover = "lrb";
	else infohover = null;
})



addEventListener("click", event => {
	if (wave == 50 && enemies.length == 0 && empowered == false) {
		empowerdesc++;
	}
	if (wave == 100 && enemies.length == 0 && corrupted == false) {
		corruptdesc++;
	}
	if (wave == 150 && enemies.length == 0 && apocalyptic == false) {
		apocdesc++;
	}
	intropage++;
	if (intropage == 4) {
		pause++;	
	}
	if (event.clientX > 440 && event.clientX < 840 && event.clientY < canvas.height - 67 && event.clientY > canvas.height - rows*50 - 67 && upgradeDisplay % 2 == 1) {
			if (upgrades[upgradeY * 8 + upgradeX] && upgrades[upgradeY * 8 + upgradeX].purchaseable()) {
				upgrades[upgradeY * 8 + upgradeX].purchase();
				upgrades[upgradeY * 8 + upgradeX].upgradeValues();
				upgradesResearched++;
				if (shownUpgrade.nextUpgrade != null) {
					upgrades.push(shownUpgrade.nextUpgrade);
				}
				if (upgrades[upgradeY * 8 + upgradeX].name.includes("Reinforcements")) {
					units.forEach((unit) => {
						unit.health *= (1 + 1/healthBoost);	
					})	
					homestead.maxhealth += 5000;
					homestead.health += 5000;
				}
				upgrades.splice(upgradeY * 8 + upgradeX, 1);
				mousePos.x = canvas.width / 2;
				mousePos.y = canvas.height / 2;
				shownUpgrade == null;
			}
		}
	if (abilityIndex != null) {
		if (abilities[abilityIndex].purchaseable()) {
			abilities[abilityIndex].purchase();
			abilities[abilityIndex].use();
		}
	}
	
	
	
    if (display == "units" && event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180) onMouse = "SPG";
    if (display == "units" && event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180) onMouse = "SAC";
    if (display == "units" && event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180) onMouse = "YAC";
    if (display == "units" && event.clientX > 340 && event.clientX < 380 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180) onMouse = "LT";
    if (display == "units" && event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100) onMouse = "Leader";
	if (display == "units" && event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && wave > 24) spawnStaff([1000000*3**staffunits, 0, 0, 0, 0, 0, 0, 0]);
	if (display == "units" && event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && wave > 150) onMouse = "Pat";
    if (display == "farming" && event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180) onMouse = "Farm";
	if (display == "farming" && event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && wave > 20) onMouse = "Cave";
	if (display == "farming" && event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && wave > 45) onMouse = "Compressor";
	if (display == "farming" && event.clientX > 340 && event.clientX < 380 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && wave > 65) onMouse = "Mine";
	if (display == "farming" && event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 140 && event.clientY < canvas.height - 100 && wave > 101) onMouse = "Pressurizer";
	if (display == "misc" && event.clientX > 100 && event.clientX < 140 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && spireWarped == false && wave > 30) onMouse = "Windspire";
	if (display == "misc" && event.clientX > 260 && event.clientX < 300 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && wave > 90) onMouse = "Beacon";
	if (display == "misc" && event.clientX > 180 && event.clientX < 220 && event.clientY > canvas.height - 220 && event.clientY < canvas.height - 180 && wave > 50) {
		if (campfirePrestige == 0 && wave <= 150) onMouse = "Campfire";
		if (campfirePrestige == 1 && wave <= 150) onMouse = "Magma";
		if (campfirePrestige == 2 && wave <= 150) onMouse = "Volcano";
		
	}

    if (player.x - canvas.width / 2 + mousePos.x >= 0 && player.y - canvas.height / 2 + mousePos.y >= 0 && player.x - canvas.width / 2 + mousePos.x <= 10000 && player.y - canvas.height / 2 + mousePos.y <= 10000) {
        if (onMouse == "SPG" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnSPG(tileSelect.m, tileSelect.n, [100*1.4**SPGunits, 0, 0, 0, 0, 0, 0, 0]);
        if (onMouse == "SAC" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnSAC(tileSelect.m, tileSelect.n, [0, 300*1.4**SACunits, 600*1.4**SACunits, 0, 0, 0, 0, 0]);
        if (onMouse == "YAC" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnYAC(tileSelect.m, tileSelect.n, [0, 0, 1200*1.4**YACunits, 400*1.4**YACunits, 0, 0, 0, 0]);
        if (onMouse == "LT" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnLT(tileSelect.m, tileSelect.n, [0, 0, 0, 0, 250*1.4**LTunits, 0, 0, 0]);
		if (onMouse == "Leader" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnLeader(tileSelect.m, tileSelect.n, [20000*1.5**leaderunits, 0, 0, 0, 0, 0, 0, 0]);
		if (onMouse == "Pat" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnPat(tileSelect.m, tileSelect.n, [1000000000000000000*10000**patunits, 0, 0, 0, 0, 0, 0, 0]);
        if (onMouse == "Farm" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null) spawnFarm(tileSelect.m, tileSelect.n, 60, 50, [1000*1.2**farmunits, 0, 0, 0, 0, 0, 0, 0]);
		if (onMouse == "Cave" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnCave(tileSelect.m, tileSelect.n, 60, 600, [20000*1.3**caveunits, 60000*1.3**caveunits, 30000*1.3**caveunits, 0, 0, 0, 0, 0]);
		if (onMouse == "Compressor" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnCompressor(tileSelect.m, tileSelect.n, 60, 400, [0, 5000000*1.35**compressunits, 1000000*1.35**compressunits, 1000000*1.35**compressunits, 0, 0, 0, 0]);
		if (onMouse == "Mine" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnMine(tileSelect.m, tileSelect.n, 60, 300, [0, 20000000*1.4**mineunits, 12000000*1.4**mineunits, 7000000*1.4**mineunits, 4000000*1.4**mineunits, 0, 0, 0]);
		if (onMouse == "Pressurizer" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnPressurizer(tileSelect.m, tileSelect.n, 60, 240, [0, 0, 0, 40000000*1.45**pressurizerunits, 20000000*1.45**pressurizerunits, 9000000*1.45**pressurizerunits, 0, 0]);
		if (onMouse == "Windspire" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null && spireWarped == false) spawnWindspire(tileSelect.m, tileSelect.n, 500, 80, [0, 330000*2.1**windspireunits, 880000*2.1**windspireunits, 0, 99000*2.1**windspireunits, 0, 0, 0]);
		if (onMouse == "Campfire" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows && wave <= 150) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnCampfire(tileSelect.m, tileSelect.n, [0, 6000000*1.7**campfireunits, 1000000*1.7**campfireunits, 0, 0, 0, 0, 0]);
		if (onMouse == "Magma" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows && wave <= 150) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnMagma(tileSelect.m, tileSelect.n, [0, 6000000*1.7**magmaunits, 1000000*1.7**magmaunits, 0, 0, 0, 0, 0]);
		if (onMouse == "Volcano" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows && wave <= 150) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnVolcano(tileSelect.m, tileSelect.n, [0, 6000000*1.7**volcanounits, 1000000*1.7**volcanounits, 0, 0, 0, 0, 0]);
		if (onMouse == "Beacon" && !(event.clientX < 450 && event.clientY > canvas.height - 300) && (event.clientY < canvas.height - 70 - 50*rows) && tiles[tileSelect.n][tileSelect.m] == null && wave > 20) spawnBeacon(tileSelect.m, tileSelect.n, [0, 0, 40000000000*1.8**beaconunits, 0, 5000000000*1.8**beaconunits, 1000000000*1.8**beaconunits, 0, 0]);
    }
    
})

addEventListener("keydown", event => {
    if (event.key == "Escape") onMouse = null;
	if (event.keyCode == 32) pause++;
})

var projectile = new Projectile(renderingPosX(player.x), renderingPosY(player.y), 5, 'black', {x:1, y:1}, true, pierce);
var projectiles = [];

let enemies = [];
let enemyprojectiles = [];
let units = [];

let keys = {"w": false, "a": false, "s": false, "d": false};

let grid = [];
let tiles = [];
noise.seed(Math.random());

for (let x = 0; x < 100; x++) {
    grid.push([]);
    for (let y = 0; y < 100; y++) {
        grid[grid.length - 1].push(~~(((p1.get(x / 50, y / 50) + p1.get(x / 100, y / 100) + p2.get(x / 25, y / 25) + p2.get(x / 10, y / 10) * 0.3) / 3.3 + 0.5) * 255));  
    }  
}

for (let i = 0; i < 200; i++) {
    tiles.push([]);
}

for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 200; j++) {
        tiles[i].push(null);
    }
}

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
        tiles[i][j] = "H";
    }
}

window.addEventListener("keydown", event => {
    keys[event.key.toLowerCase()] = true;
})

window.addEventListener("keyup", event => {
    keys[event.key.toLowerCase()] = false;
})

window.onresize = event => { canvas.width = window.innerWidth; canvas.height = window.innerHeight };

function getColor(value) {
	if (value < 0.04) {
		return "#BA9A66";
	} else if (value < 0.08) {
		return "#E2AE82";
	} else if (value < 0.14) {
		return "#A57F54";
	} else if (value < 0.22) {
		return "#C67936";
	} else if (value < 0.35) {
		return "#6B3E2E";
	} else if (value < 0.45) {
		return "#633812";
	} else {
		return "#3F230A";
	}

    
}


// all rendering pos coordinates are on the currently displayed canvas
function renderingPosX(x) {
    return x + canvas.width / 2 - player.x;
}
function renderingPosY(y) {
    return y + canvas.height / 2 - player.y;
}

function edgeDist(x, y) {
    let a = x;
    let b = y;
    return Math.sqrt(a * a + b * b);
}

function getImage(src){
    let img = new Image();
    img.src = src;
    return img;
}

function spawnEnemy(x, y, radius, health, maxhealth, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image));
}

function spawnSPG(m, n, cost) {
    if (priceCheck(cost)) {
        units.push(new SPG(m, n, 1500, 20, cost, 1));    
        tiles[n][m] = "SPG";
        SPGunits++;
    }
    
}

function spawnSAC(m, n, cost) {
    if (priceCheck(cost)) {
        units.push(new SAC(m, n, 600, 11, cost, 1));    
        tiles[n][m] = "SAC";
        SACunits++;
    }
    
}

function spawnYAC(m, n, cost) {
    if (priceCheck(cost)) {
        units.push(new YAC(m, n, 700, 12, cost, 1));    
        tiles[n][m] = "YAC";
        YACunits++;
    }
    
}

function spawnLT(m, n, cost) {
    if (priceCheck(cost)) {
        units.push(new LT(m, n, 800, 13, cost, 1)); 
        tiles[n][m] = "LT";
        LTunits++;
    }
}

function spawnLeader(m, n, cost) {
    if (priceCheck(cost)) {
        units.push(new Leader(m, n, 800, 14, cost, 1)); 
        tiles[n][m] = "Leader";
        leaderunits++;
    }
}

function spawnPat(m, n, cost) {
    if (priceCheck(cost)) {
        units.push(new Pat(m, n, 1000, 1, cost, 1)); 
        tiles[n][m] = "Pat";
        patunits++;
    }
}

function spawnStaff(cost) {
    if (priceCheck(cost)) {
        staffunits++;
		if (a4 == true) strengthunits++;
		homestead.maxhealth += 2000;
		homestead.health += 2000;
    }
}

function spawnFarm(m, n, farmrate, crate, cost) {
    if (priceCheck(cost)) {
        units.push(new Farm(m, n, farmrate, farmrate, crate, cost));    
        tiles[n][m] = "Farm";
        farmunits++;
    }
}

function spawnCave(m, n, caverate, excavation, cost) {
    if (priceCheck(cost)) {
        units.push(new Cave(m, n, caverate, caverate, excavation, cost));    
        tiles[n][m] = "Cave";
        caveunits++;
    }
}

function spawnCompressor(m, n, compressrate, compression, cost) {
    if (priceCheck(cost)) {
        units.push(new Compressor(m, n, compressrate, compressrate, compression, cost));    
        tiles[n][m] = "compressor";
        compressunits++;
    }
}

function spawnMine(m, n, minerate, load, cost) {
    if (priceCheck(cost)) {
        units.push(new Mine(m, n, minerate, minerate, load, cost));    
        tiles[n][m] = "mine";
        mineunits++;
    }
}

function spawnPressurizer(m, n, pressrate, press, cost) {
    if (priceCheck(cost)) {
        units.push(new Pressurizer(m, n, pressrate, pressrate, press, cost));    
        tiles[n][m] = "pressurizer";
        pressurizerunits++;
    }
}

function spawnWindspire(m, n, range, slowdown, cost) {
    if (priceCheck(cost)) {
		units.push(new Windspire(m, n, range, slowdown, cost)); 
        tiles[n][m] = "Windspire";
        windspireunits++;
		warpspired.description = `Sacrifice the ability to purchase windspires in order to enchant the homestead with wind. The homestead transforms into a massive windspire whose strength is determined by the number of windspires purchased before this upgrade. At your current amount of ${windspireunits} windspires, you will attain a ${Math.floor(100*(1 - 1/Math.log(windspireunits*2)))}% global slowdown and damage reduction.`;
    }
}

function spawnCampfire(m, n, cost) {
    if (priceCheck(cost)) {
		units.push(new Campfire(m, n, cost)); 
        tiles[n][m] = "Campfire";
        campfireunits++;
    }
}

function spawnMagma(m, n, cost) {
    if (priceCheck(cost)) {
		units.push(new Magma(m, n, cost)); 
        tiles[n][m] = "Magma";
        magmaunits++;
		fireLootBuff += 0.03;
    }
}

function spawnVolcano(m, n, cost) {
    if (priceCheck(cost)) {
		units.push(new Volcano(m, n, cost)); 
        tiles[n][m] = "Volcano";
        volcanounits++;
		fireLootBuff += 0.04;
    }
}

function spawnBeacon(m, n, cost) {
    if (priceCheck(cost)) {
		units.push(new Beacon(m, n, cost)); 
        tiles[n][m] = "Beacon";
        beaconunits++;
    }
}

for (let i = 7; i < 10; i++) {
    for (let j = 1; j < 3; j++) {
        spawnFarm(i, j, 60, 50, [0, 0, 0, 0]);
    }
}
farmunits = 0;

function priceCheck(cost) {
	let purchaseable = true;
	for (let i = 0; i < 8; i++) {
		if (resources[i] < cost[i]) {
			purchaseable = false;
		}
	}
	if (purchaseable == false) {
		return false;
	} else {
		for (let i = 0; i < 8; i++) {
			resources[i] -= cost[i]
		}
		return true;
	}
}

function enemyDeath(enemy) {
	homestead.health += 100*leechBoost;
	homestead.health = Math.min(homestead.health, homestead.maxhealth);
	enemiesKilled++;
	let totalResourceMultiplier =  Math.log(wave)*enemy.maxhealth*globalResourceBoost*(1 + wave/100*eng)*fireLootBuff*1.05**eva*lootMultiplier
    resources[0] += Math.log(wave)*(1 + farmBoost/4)*foodNerds*totalResourceMultiplier;
	resources[1] += Math.log(wave)/4*(1 + lumberBoost*0.55)*woodNerds*totalResourceMultiplier;
	resources[2] += Math.log(wave)/9*stoneNerds*totalResourceMultiplier;
	resources[3] += Math.log(wave)/16*copperNerds*totalResourceMultiplier;
	resources[4] += Math.log(wave)/25*titaniumNerds*totalResourceMultiplier;
	if (enemy.radius == 40 || wave >= 150) resources[6] += Math.log(wave/32)/36*antimatterNerds*totalResourceMultiplier;
	if (absp > 0) absp -= 30;
	if (wave > 150 && enemy.radius == 150) enemies.length = 0;
	if (wave > 100) enemyNova(enemy, Math.floor((Math.random()*wave/10) + 5), enemy.damage);
}

function getAdjacent(unit) {
	let m = unit.m;
	let n = unit.n;
	let adjacentTiles = [];
	for (let i = m-1; i < m+2; i++) {
		for (let j = n-1; j < n+2; j++) {
			adjacentTiles.push(tiles[j][i]);
		}
	}
	adjacentTiles.splice(4, 1);
	return adjacentTiles;
}

function applyYACBuffs(tile, adjacentTiles) {
	let YACstacks = 0;
	for (let i = 0; i < 8; i++) {
		if (adjacentTiles[i] == "YAC") YACstacks++;
	}
	return YACstacks;
}

function applyLTBuffs(tile, adjacentTiles) {
	let LTstacks = 0;
	for (let i = 0; i < 8; i++) {
		if (adjacentTiles[i] == "LT") LTstacks++;
	}
	return LTstacks;
}

function applyLeaderBuffs(tile, adjacentTiles) {
	let Leaderstacks = 0;
	for (let i = 0; i < 8; i++) {
		if (adjacentTiles[i] == "Leader") Leaderstacks++;
	}
	return Leaderstacks;
}

function applyCampfireBuffs(tile, adjacentTiles) {
	let Firestacks = 0;
	for (let i = 0; i < 8; i++) {
		if (adjacentTiles[i] == "Campfire") Firestacks++;
	}
	return Firestacks;
}

function applyMagmaBuffs(tile, adjacentTiles) {
	let Magmastacks = 0;
	for (let i = 0; i < 8; i++) {
		if (adjacentTiles[i] == "Magma") Magmastacks++;
	}
	return Magmastacks;
}

function simplify(amount) {
	if (amount < 10000) return Math.floor(amount);
	for (let j = 10; j >= 0; j--) {
		let placeValue = 10**(3*(j + 1));
		if (amount >= placeValue) {
			let magnitude = Math.floor(Math.log10(amount));
			let firstdigit = Math.floor(amount/(10**magnitude));
			let seconddigit = Math.floor((amount%(10**magnitude))/(10**(magnitude-1)));
			let thirddigit = Math.floor((amount%(10**(magnitude-1)))/(10**(magnitude-2)));
			if (magnitude % 3 == 0) return `${firstdigit}.${seconddigit}${thirddigit}${values[j]}`;
			else if (magnitude % 3 == 1) return `${firstdigit}${seconddigit}.${thirddigit}${values[j]}`;
			else return `${firstdigit}${seconddigit}${thirddigit}${values[j]}`;
		}
	}
}

function displayCosts(baseCost, costMultiplier, levels) {
	let displayableCost = [];
	for (let i = 0; i < 8; i++) {
		displayableCost.push(baseCost[i]*(costMultiplier**levels));
	}
	let resourceCounter = 0;
	for (let i = 0; i < 8; i++) {
		if (displayableCost[i] != 0) {
			ctx.drawImage(getImage(resourceImages[i]), 50, canvas.height - 505 + 30*resourceCounter, 30, 30);
			ctx.fillText(simplify(Math.floor(displayableCost[i])), 90, canvas.height - 478 + 30*resourceCounter);
			resourceCounter++;
		}
	}
}

function displayUpgradeCosts(cost) {
	let resourceCounter = 0;
	for (let i = 0; i < 8; i++) {
		if (cost[i] != 0) {
			ctx.drawImage(getImage(resourceImages[i]), 450, canvas.height - rows*50 - 415 + 20*resourceCounter, 20, 20);
			ctx.fillText(simplify(Math.floor(cost[i])), 480, canvas.height - rows*50 - 395 + 20*resourceCounter);
			resourceCounter++;
		}
	}
}

function enemyNova(enemy, projCount, damage) {
	for (let i = 0; i < projCount; i++) {
		let projV = {x:Math.cos(Math.PI*2*i/projCount)*10, y:Math.sin(Math.PI*2*i/projCount)*10}
		enemyprojectiles.push(new enemyProjectile(enemy.x, enemy.y, enemy.projradius, "#660000", projV, 1, damage, false));
	}
}

function appendUpgrade(upgrade) {
	upgrades.push(upgrade);
	upgradechecked = false;
}

resources = [500, 0, 0, 0, 0, 0, 0, 0];

animate();


