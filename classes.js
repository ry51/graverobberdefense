class Player {
    constructor(x, y, radius, color, state, auto, reloadTime, maxReloadTime, rocketReloadTime, xbowReloadTime, damage, projSize, projColour) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.state = state;
        this.auto = auto;
        this.reloadTime = reloadTime;
        this.maxReloadTime = maxReloadTime;
        this.rocketReloadTime = rocketReloadTime;
        this.xbowReloadTime = xbowReloadTime;
        this.damage = damage;
        this.projSize = projSize;
        this.projColour = projColour;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), 31, 0, Math.PI * 2, true)
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), 30, 0, Math.PI * 2, true)
        ctx.fillStyle = "#AAAAAA";
        ctx.fill()
    }

    shoot(target) {
        const angle = Math.atan2(target.y - this.y, target.x- this.x);
        const velocity = {x:Math.cos(angle)*Math.min(15 + wave/3, 30), y:Math.sin(angle)*Math.min(15 + wave/3, 30)};
        projectiles.push(new Projectile(this.x, this.y, this.projSize, this.projColour, velocity, 50, 1, this.damage + wave, target, 1));
    }

    update() {
        if (pause % 2 == 0) this.reloadTime -= 1;
        player.draw();
        let mindist = 5000;
        let closestenemy = null;
        for (let enemy of enemies) {
            let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
            if (distance < mindist) {
                mindist = distance;
                closestenemy = enemy;
            }
        }
        if (closestenemy && this.reloadTime <= 0) {
            this.shoot(closestenemy);
            this.reloadTime = this.maxReloadTime;
        }
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity, lifeTime, pierce, damage, target, isCB) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.lifeTime = lifeTime;
        this.pierce = pierce;
        this.damage = damage;
        this.target = target;
        this.isCB = isCB;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        if (pause % 2 === 0) {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
}

class Enemy {
    constructor(x, y, radius, velocity, health, maxhealth, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image, isPoisoned) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.health = health;
        this.maxhealth = maxhealth;
        this.projradius = projradius;
        this.projcolor = projcolor;
        this.projlifeTime = 60;
        this.projpierce = projpierce;
        this.enemyReloadTime = enemyReloadTime;
        this.enemyReloadTimer = enemyReloadTimer;
        this.damage = damage;
        this.image = getImage(image);
        this.isPoisoned = isPoisoned;
    }

    draw() {
        ctx.save();
        ctx.translate(renderingPosX(this.x), renderingPosY(this.y));
        ctx.rotate((Math.atan2(-this.y, -this.x) + Math.PI/2));
        ctx.drawImage(this.image, -this.radius, -this.radius);
        ctx.restore();
    }

    update() {
        this.draw();
        if (pause % 2 === 0) {
            this.enemyReloadTime--;
            if (this.isPoisoned && pause % 2 == 0) this.health -= 5;
        }
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        let mindist = 10000;
        let closestunit = null;
        for (let unit of units) {
            let distance = Math.hypot(unit.m*50 - 25 - this.x, unit.n*50 - 25 - this.y);
            if (distance < mindist) {
                mindist = distance;
                if (mindist < 1000) {
                    closestunit = unit;
                }
            }
        }
        let cornerdist = Math.hypot(this.x, this.y);
        if (cornerdist <= 1200) {
            closestunit = homestead;
        }
        if (closestunit && this.enemyReloadTime <= 0) {
            this.shoot(closestunit);
            this.enemyReloadTime = this.enemyReloadTimer;
        }
    }

    shoot(target) {
        if (target != homestead) {
            if (this.radius >= 150) {
                const angle = Math.atan2(target.n*50 - 25 - this.y, target.m*50 - 25 - this.x);
                for (let i = -Math.floor(wave/50) - 1; i < Math.ceil(wave/50) + 2; i++) {
                    const velocity = {x:Math.cos(angle + Math.PI/12*i)*8, y:Math.sin(angle + Math.PI/12*i)*8};
                    enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, false));
                }
            } else {
                const angle = Math.atan2(target.n*50 - 25 - this.y, target.m*50 - 25 - this.x);
                const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8};
                enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, false));
            }
        } else {
            if (this.radius >= 150) {
                const angle = Math.atan2(-this.y, -this.x);
                for (let i = -Math.floor(wave/50) - 1; i < Math.ceil(wave/50) + 2; i++) {
                    const velocity = {x:Math.cos(angle + Math.PI/12*i)*8, y:Math.sin(angle + Math.PI/12*i)*8};
                    enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, false));
                }
            } else {
                const angle = Math.atan2(-this.y, -this.x);
                const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8};
                enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, false));
            }
        } 
    }
}

class enemyProjectile {
    constructor(x, y, radius, color, velocity, pierce, damage, isHoming) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.isHoming = isHoming;
        if (this.isHoming === true) {
            this.lifeTime = 540;
        }
        else {
            this.lifeTime = 90;
        }
        this.pierce = pierce;
        this.damage = damage;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.lifeTime--;
    }
}

class Building {
    constructor(m, n, type, health, color, cost) {
        this.m = m;
        this.n = n;
        this.type = type;
        this.health = health;
        this.color = color;
        this.cost = cost;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(renderingPosX(this.m*50 - 25), renderingPosY(this.n*50 - 25), 25, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Unit extends Building {
    constructor(m, n, type, health, reloadTime, maxReloadTime, range, damage, color, projRadius, cost, supportBuffs) {
        super(m, n, type, color, cost)
        this.m = m;
        this.n = n;
        this.type = type;
        this.health = health;
        this.reloadTime = reloadTime;
        this.maxReloadTime = maxReloadTime;
        this.range = range;
        this.damage = damage;
        this.color = color;
        this.projRadius = projRadius;
        this.cost = cost;
        this.supportBuffs = supportBuffs;
    }
    
    shoot(target) {
        /*
        This code is to make the projectiles more accurate against a moving target, but somehow gets messed up when a speed-reducing ability is used or when enemies enter the range of a windspire
        const enemydist = Math.hypot(target.x - this.m*50 + 25, target.y - this.n*50 + 25);
        const targetspeed = target.velocity.x**2 + target.velocity.y**2;
        const enemytime = targetspeed ? enemydist/targetspeed + 1 : 0;
        const angle = Math.atan2((target.y + target.velocity.y*enemytime) - this.n*50 + 25, (target.x + target.velocity.x*enemytime) - this.m*50 + 25);
        */
        const angle = Math.atan2(target.y - this.n*50 + 25, target.x- this.m*50 + 25);
        const velocity = {x:Math.cos(angle)*Math.min(this.range*(1 + 0.2*beaconunits)/40 + wave/2, 50), y:Math.sin(angle)*Math.min(this.range*(1 + 0.2*beaconunits)/40 + + wave/2, 30)};
        projectiles.push(new Projectile(this.m*50 - 25, this.n*50 - 25, this.projRadius, "#000000", velocity, 50, pierce, this.damage*this.supportBuffs, target, false));
    }
    
    update() {
        if (pause % 2 === 0) {
            if (wave <= 50) this.reloadTime -= (1 + 0.1*oc);
            else if (wave <= 200 && chilled == 0.01) this.reloadTime -= 0.0625*(1 + 0.1*oc);
            else if (wave <= 200) this.reloadTime -= 0.25*(1 + 0.1*oc);
        }
        let mindist = 10000;
        let closestenemy = null;
        for (let enemy of enemies) {
            let distance = Math.hypot(this.m*50 - 25 - enemy.x, this.n*50 - 25 - enemy.y);
            if (distance < mindist) {
                mindist = distance;
                if (mindist < this.range*(1 + beaconunits*0.2)*(1 + songBoost*0.15)) {
                    closestenemy = enemy;
                }
            }
        }
        if (closestenemy && this.reloadTime <= 0) {
            this.shoot(closestenemy);
            this.reloadTime = this.maxReloadTime;
        }
    }
}

class SPG extends Unit {
    constructor(m, n, range, damage, cost, supportBuffs) {
        super(m, n, 'SPG', 550*(1 + healthBoost), 25, 25, range, damage, "#C67936", 6, cost, 1);
    }
}

class SAC extends Building {
    constructor(m, n, cost) {
        super(m, n, 'Curse', 1000*(1 + healthBoost), "#646464");
    }

    update() {};
}

class YAC extends Building {
    constructor(m, n, cost) {
        super(m, n, 'Fall', 1400*(1 + healthBoost), "#6B3E2E");
    }

    shoot() {
        const velocity = {x:0, y:0};
        projectiles.push(new Projectile(this.m*50 - 70 + Math.random()*90, this.n*50 - 40 + Math.random()*30, 10, "#949494", velocity, 4, pierce, 100, null, false));
    }
    
    update() {
        if (time % 2 == 0 && pause % 2 == 0) this.shoot();
    }
}

class LT extends Building {
    constructor(m, n, cost) {
        super(m, n, 'Hole', 6000*(1 + healthBoost), "#111111");
    }

    update() {};
}

class Leader extends Building {
    constructor(m, n, cost) {
        super(m, n, 'Gas', 10000*(1 + healthBoost), "#0B8E3A");
    }

    update() {};
}


class Farm extends Building {
    constructor(m, n, farmrate, maxFarmrate, crate, cost) {
        super(m, n, 'Farm', 1000*(1 + healthBoost), "#004400")
        this.m = m;
        this.n = n;
        this.farmrate = farmrate;
        this.maxFarmrate = maxFarmrate;
        this.crate = crate;
        this.cost = cost;
    }

    update() {
        if (pause % 2 == 0) {
            this.farmrate--;
            if (this.farmrate <= 0) {
                resources[0] += this.crate*(farmBoost*3 + 1)*(wave/4 + 1)*farmBuff*farmEff;
                this.farmrate = this.maxFarmrate;
            }
        }
    }
}

class Cave extends Building {
    constructor(m, n, caverate, maxCaverate, excavation, cost) {
        super(m, n, 'Cave', 7000*(1 + healthBoost), "#666666")
        this.m = m;
        this.n = n;
        this.caverate = caverate;
        this.maxCaverate = maxCaverate;
        this.excavation = excavation;
        this.cost = cost;
    }
    
    update() {
        if (pause % 2 == 0) {
            this.caverate--;
            if (this.caverate <= 0) {
                resources[2] += this.excavation*(wave/8 + 1)*farmBuff*caveEff;
                this.caverate = this.maxCaverate;
            }
        }
    }
}

class Compressor extends Building {
    constructor(m, n, compressrate, maxCompressrate, compression, cost) {
        super(m, n, 'Compressor', 20000*(1 + healthBoost), "#888844")
        this.m = m;
        this.n = n;
        this.compressrate = compressrate;
        this.maxCompressrate = maxCompressrate;
        this.compression = compression;
        this.cost = cost;
    }
    
    update() {
        if (pause % 2 == 0) {
            this.compressrate--;
            if (this.compressrate <= 0) {
                resources[3] += this.compression*(wave/10 + 1)/2*farmBuff*compEff;
                this.compressrate = this.maxCompressrate;
            }
        }
    }
}

class Mine extends Building {
    constructor(m, n, minerate, maxMinerate, load, cost) {
        super(m, n, 'Mine', 25000*(1 + healthBoost), "#3D251E")
        this.m = m;
        this.n = n;
        this.minerate = minerate;
        this.maxMinerate = maxMinerate;
        this.load = load;
        this.cost = cost;
    }
    
    update() {
        if (pause % 2 == 0) {
            this.minerate--;
            if (this.minerate <= 0) {
                resources[4] += this.load*(wave/15 + 1)/2.5*farmBuff*mineEff;
                this.minerate = this.maxMinerate;
            }
        }
    }
}

class Pressurizer extends Building {
    constructor(m, n, pressrate, maxPressrate, press, cost) {
        super(m, n, 'Mine', 25000*(1 + healthBoost), "#BEC2CB")
        this.m = m;
        this.n = n;
        this.pressrate = pressrate;
        this.maxPressrate = maxPressrate;
        this.press = press;
        this.cost = cost;
    }
    
    update() {
        if (pause % 2 == 0) {
            this.pressrate--;
            if (this.pressrate <= 0) {
                resources[4] += this.press*(wave/20 + 1)/3*farmBuff*pressEff;
                this.pressrate = this.maxPressrate;
            }
        }
    }
}

class Windspire extends Building {
    constructor(m, n, range, slowdown, cost) {
        super(m, m, 'Windspire', 11000*(1 + healthBoost), "#333333");
        this.m = m;
        this.n = n;
        this.range = range;
        this.slowdown = slowdown;
        this.cost = cost;
    }
    
    update() {  
    }
}

class Campfire extends Building {
    constructor(m, n, cost) {
        super(m, m, 'Campfire', 6500*(1 + healthBoost), "#BB0000");
        this.m = m;
        this.n = n;
        this.cost = cost;
    }
    
    update() {  
    }
}

class Magma extends Building {
    constructor(m, n, cost) {
        super(m, m, 'Magma', 7500*(1 + healthBoost), "#DD0000");
        this.m = m;
        this.n = n;
        this.cost = cost;
    }
    
    update() {  
    }
}

class Volcano extends Building {
    constructor(m, n, cost) {
        super(m, m, 'Volcano', 8500*(1 + healthBoost), "#FF0000");
        this.m = m;
        this.n = n;
        this.cost = cost;
    }
    
    update() {  
    }
}

class Beacon extends Building {
    constructor(m, n, cost) {
        super(m, m, 'Beacon', 15000*(1 + healthBoost), "#301934");
        this.m = m;
        this.n = n;
        this.cost = cost;
    }
    
    update() {  
    }
}

class Homestead {
    constructor(x, y, health, maxhealth, image)    {
        this.x = x;
        this.y = y;
        this.health = health;   
        this.maxhealth = maxhealth;
        this.image = getImage(image);
    }
    
    draw() {
        ctx.drawImage(this.image, renderingPosX(this.x), renderingPosY(this.y), 300, 200);
    }
}

class Upgrade {
    constructor(name, description, cost, nextUpgrade, image, effect) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.nextUpgrade = nextUpgrade;
        this.image = image;
        this.effect = effect;
    }
    
    purchaseable() {
        let purchaseable = true;
        for (let i = 0; i < 8; i++) {
            if (resources[i] < this.cost[i]) {
                purchaseable = false;
            }
        }
        return purchaseable;
    }
    
    purchase() {
        for (let i = 0; i < 8; i++) {
            resources[i] -= this.cost[i];
        }
    }
    
    upgradeValues() {   
        if (this.effect == "buffBoost") buffBoost++;    
        if (this.effect == "buffDoubleBoost") buffBoost += 2;   
        if (this.effect == "globalPower") globalPower++;
        if (this.effect == "triGlobalPower") globalPower += 3;
        if (this.effect == "farmBoost") farmBoost++;
        if (this.effect == "duoBoost") duoBoost++;
        if (this.effect == "lumberBoost") lumberBoost++;
        if (this.effect == "healthBoost") {
            healthBoost++;
            reinforcements = new Upgrade("Reinforcements", `All units on screen gain an additional +100% health. You have purchased this upgrade ${healthBoost} times, granting +${100*healthBoost}% health to all units.`, [0, 5000*8**healthBoost, 0, 0, 0, 0, 0, 0], null, `./assets/upgrades/reinforcements${healthBoost%7}.png`, "healthBoost");
            appendUpgrade(reinforcements);
        }
        if (this.effect == "meditationBoost") meditationBoost++;
        if (this.effect == "confidenceBoost") confidenceBoost++;
        if (this.effect == "spireBoost") {
            spireBoost++;
            windMultiplier *= 0.8;
        }
        if (this.effect == "spireWarp") {
            spireBoost++;
            windMultiplier *= 0.8;
            spireWarped = true;
            sacWindspires();
            homestead.image = getImage("./assets/misc/warpstead.png");
        }
        if (this.effect == "foodNerds") foodNerds = 3;
        if (this.effect == "woodNerds") woodNerds = 3.25;
        if (this.effect == "stoneNerds") stoneNerds = 3.5;
        if (this.effect == "copperNerds") copperNerds = 3.75;
        if (this.effect == "titaniumNerds") titaniumNerds = 4;
        if (this.effect == "diamondNerds") diamondNerds = 4.5;
        if (this.effect == "antimatterNerds") antimatterNerds = 5;
        if (this.effect == "resourceBoostBoost") globalResourceBoost *= 1.1;
        if (this.effect == "campfirePrestige") campfirePrestige += 1;
        if (this.effect == "bm") bm = 0.7;
        if (this.effect == "pairBoost") pairBoost += 1;
        if (this.effect == "leechBoost") leechBoost += 1;
        if (this.effect == "pierceBoost") piercechance += 0.1;
        if (this.effect == "advance") {
            advance = true;
            globalPower += 2;
        }
        if (this.effect == "demolition") {
            enemyStrength *= 1.25;
            globalPower += 6;
        }
        if (this.effect == "rejuv") rejuv = true;
        if (this.effect == "asc") {
            asc = true;
            ascWave = wave;
        }
        if (this.effect == "doom") doom = true;
        if (this.effect == "leaderBoost") leaderBoosted = 1;
        if (this.effect == "SPGBoost") SPGBoost = true;
        if (this.effect == "SACBoost") SACBoost = true;
        if (this.effect == "YACBoost") YACBoost = true;
        if (this.effect == "LTBoost") LTEff += 4;
        if (this.effect == "expd") leaderEff += 4;
        if (this.effect == "ofb") a4 = true;
        if (this.effect == "psi") chargeStorage = 15;
        if (this.effect == "uberfarmBoost") {
            ufarmstacks++;
            farmBuff = ufarms[ufarmstacks];
        }
        if (this.effect == "pcache") abilities.splice(0, 1, collection);
        if (this.effect == "peva") abilities.splice(1, 1, vaporization);
        if (this.effect == "pchill") abilities.splice(2, 1, deepFreeze);
        if (this.effect == "phalt") abilities.splice(3, 1, termination);
        if (this.effect == "prejuv") abilities.splice(4, 1, reincarnation);
        if (this.effect == "pforce") abilities.splice(5, 1, might);
        if (this.effect == "pwb") abilities.splice(6, 1, colloidalArmor);
        if (this.effect == "pcb") abilities.splice(7, 1, transgalacticStrike);
        if (this.effect == "sportBoost") sportBoost++;
        if (this.effect == "oc") oc++;
        if (this.effect == "logResourceBoost") lrb = true;
        if (this.effect == "sfb") {
            winnable = true;
            spawnEnemy(9999, 9999, 150, 10000000000000000000000, 10000000000000000000000, 19, "#660000", 1, 12, 12, 15000, './assets/enemies/CRACKEDboss.png');
        }
        if (this.effect == "songBoost") {
            songBoost++;
            if (songBoost > 4) globalPower += 2;
            else globalPower++;
        }
        if (this.effect == "kbBoost") {
            knockback += 20;
            globalPower += knockback/20;
        }
        if (this.effect == "rsc") rsc++;
        if (this.effect == "eng") eng++;
        if (this.effect == "farmdr") {
            farmdr++;
            switch (farmdr) {
                case 1: farmEff *= 2; break;
                case 2: caveEff *= 2; break;
                case 3: compEff *= 2; break;
                case 4: mineEff *= 2; break;
            }
        }
        if (this.effect == "bellBoost") {
            bellStacks++;
            belligerence = new Upgrade("Belligerence", `Units deal a compounding 15% more damage while enemies deal a compounding 75% more damage. This upgrade can be purchased many times - but be careful when doing so as enemies get much stronger. You have purchased this upgrade ${bellStacks} times, granting +${Math.floor((1.15**bellStacks - 1)*100)}% damage, and giving enemies +${Math.floor((1.75**bellStacks - 1)*100)}% damage.`, [0, 0, 0, 100*10**bellStacks, 50*10**bellStacks, 0, 0, 0], null, './assets/upgrades/belligerence.png', "bellBoost");
            appendUpgrade(belligerence);
        }
        if (this.effect == "ka") double = true;
        if (this.effect == "ba") types = true;
        if (this.effect == "akh") deathdebuff = true;
        if (this.effect == "maat") matted = true;
        if (this.effect == "imp") {
            implevel++;
            globalPower++;
        }
        if (this.effect == "b") globalPower += 2;
        if (this.effect == "t1") {
            healps += 10;
            homesteadmaxhp += 3000;
			homestead.maxhealth += 3000;
			homestead.image = getImage("assets/misc/tomb1.png");
        }
        if (this.effect == "t2") {
            healps += 15;
            homesteadmaxhp += 3000;
			homestead.maxhealth += 3000;
			homestead.image = getImage("assets/misc/tomb2.png");
        }
        if (this.effect == "t3") {
            tomblevel = 3;
            healps += 20;
            homesteadmaxhp += 3000;
			homestead.maxhealth += 3000;
			homestead.image = getImage("assets/misc/tomb3.png");
        }
        if (this.effect == "t4") {
            tomblevel = 4;
            healps += 25;
            homesteadmaxhp += 3000;
			homestead.maxhealth += 3000;
			homestead.image = getImage("assets/misc/tomb4.png");
        }
        if (this.effect == "t5") {
            tomblevel = 5;
            healps += 30;
            homesteadmaxhp += 3000;
			homestead.maxhealth += 3000;
			homestead.image = getImage("assets/misc/tomb5.png");
        }
		console.log(homestead.image);
    }
}

class Ability {
    constructor(name, description, cost, image) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.image = image;
    }
    
    purchaseable() {
        if (resources[7] >= this.cost) return true;
        else return false;
    }
    
    purchase() {
        resources[7] -= this.cost;
    }
    
    use() {
        if (this.name == "Cache") {
            for (let i = 0; i < 7; i++) {
                resources[i] *= 2;
            }
        } else if (this.name == "Collection") {
            for (let i = 0; i < 7; i++) {
                resources[i] *= 4;
            }
        } else if (this.name == "Chill") {
            chilled = 0.5;
            chilltime = 1800;
        } else if (this.name == "Deep Freeze") {
            chilled = 0.01;
            chilltime = 2700;
        } else if (this.name == "Rejuvination") {
            for (let unit of units) {
                unit.health = unit.maxhealth;
            }
        } else if (this.name == "Reincarnation") {
            for (let unit of units) {
                unit.health = unit.maxhealth;
            }
            homestead.health = homestead.maxhealth;
            rnc++;
        } else if (this.name == "Cosmic Blast") {
            for (let i = 0; i < enemies.length; i++) {
                if (i % 6 == 5 && enemies[i].radius < 150) {
                    enemyDeath(enemies[i]);
                    enemies.splice(i, 1);
                }
                else {
                    enemies[i].x = 10000 - enemies[i].x;
                    enemies[i].y = 10000 - enemies[i].y;
                }
            }
        } else if (this.name == "Transgalactic Strike") {
            for (let i = 0; i < enemies.length; i++) {
                if (i % 4 != 0 && enemies[i].radius < 150) {
                    enemyDeath(enemies[i]);
                    enemies.splice(i, 1);
                }
                else {
                    if (enemies[i].x < enemies[i].y) enemies[i].y = 10000;
                    else enemies[i].x = 10000;
                }
            }
        } else if (this.name == "Water Break") {
            wb = 0.5;
            wbtime = 3600;
            wbstacks++;
        } else if (this.name == "Colloidal Armor") {
            absp = 90;
        } else if (this.name == "Force") {
            fc = 2;
            fctime = 1800;
            fcstacks++;
        } else if (this.name == "Might") {
            fc = 3;
            fctime = 3000;
            mtstacks++;
        } else if (this.name == "Halt") {
            ht = 0;
            httime = 1200;
            htstacks++;
        } else if (this.name == "Termination") {
            ht = 0;
            httime = 1800;
            tmstacks++;
            enemies.forEach((enemy) => {
                enemy.x += 1000;
                enemy.y += 1000;
            })
        } else if (this.name == "Evaporation") {
            for (let i = 0; i < 7; i++) {
                resources[i] = 0;
            }
            eva++;
        } else if (this.name == "Vaporization") {
            for (let i = 0; i < 7; i++) {
                resources[i] = 0;
            }
            eva++;
            vap++;
        }
    }
}