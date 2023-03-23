function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineTo(renderingPosX(0), renderingPosY(0));
    ctx.lineTo(renderingPosX(10000), renderingPosY(0));
    ctx.lineTo(renderingPosX(10000), renderingPosY(10000));
    ctx.lineTo(renderingPosX(0), renderingPosY(10000));
    ctx.lineTo(renderingPosX(0), renderingPosY(0));
    ctx.lineWidth = 6;
    ctx.strokeStyle = "black";
    ctx.stroke();

    if (pause % 2 == 0) {
        time++;
        novaTimer++;
        resources[1] += 4/3*(wave/2 + 1)*lumberBoost*leaderunits*Math.log(wave + 10);
    }

    if (winnable == true && enemies.length == 0) won = true;
    
    ctx.textAlign = "left";
   
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (renderingPosX(100 * x) < - 100 || renderingPosX(100 * x) > canvas.width + 100 || renderingPosY(100 * y) < -100 || renderingPosY(100 * y) > canvas.height + 100) {
                continue;
            }  
            if (wave <= 150) ctx.fillStyle = getColor(grid[x][y]*(edgeDist(x, y)/25000)); 
            else ctx.fillStyle = getColor(grid[x][y]/325); 
            ctx.fillRect(renderingPosX(100 * x), renderingPosY(100 * y), 101, 101);
        }
    }
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(canvas.width - 252, canvas.height - 252, 204, 204);


    for (let x = 0; x < grid.length; x += 2) {
        for (let y = 0; y < grid[x].length; y += 2) {
            if (wave <= 150) ctx.fillStyle = getColor(grid[x][y]*(edgeDist(x, y)/25000));
            else ctx.fillStyle = getColor(grid[x][y]/325); 
            ctx.fillRect(canvas.width - 250 + 2*x, canvas.height - 250 + 2*y, 4, 4);
        }
    }

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(renderingPosX(tileSelect.m*50 - 50), renderingPosY(tileSelect.n*50 - 50), 50, 50);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(canvas.width - 250 + player.x / 50, canvas.height - 250 + player.y / 50, 4, 0, Math.PI*2, true);
    ctx.fill();

    enemies.forEach((enemy) => {
        ctx.fillStyle = "#FF4400";
        ctx.beginPath();
        ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 4, 0, Math.PI*2, true);
        ctx.fill();
    });

    if (dead == false) {
        console.log(homestead.image);
        homestead.draw();
        player.update();
    }

    enemies.forEach((enemy) => {
        if (!enemy.isPoisoned) ctx.fillStyle = "#000000"
        else ctx.fillStyle = "#0B8E3A";
        ctx.fillRect(renderingPosX(enemy.x) - 42, renderingPosY(enemy.y) - 52 - enemy.radius, 84, 34)
        ctx.fillStyle = "#FF0000"
        ctx.fillRect(renderingPosX(enemy.x) - 40, renderingPosY(enemy.y) - 50 - enemy.radius, 80, 30)
        if (!enemy.isPoisoned) ctx.fillStyle = "#00FF00"
        else ctx.fillStyle = "#0B8E3A";
        ctx.fillRect(renderingPosX(enemy.x) - 40, renderingPosY(enemy.y) - 50 - enemy.radius, 80*(enemy.health/enemy.maxhealth), 30)
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.font = "20px Courier New"
        ctx.fillText(simplify(Math.floor(enemy.health)), renderingPosX(enemy.x), renderingPosY(enemy.y) - 30 - enemy.radius);
        ctx.textAlign = "left";
        if (novaTimer >= (200 - wave/2)) {
            enemies.forEach((enemy) => {
                if (enemy.radius >= 150) {
                    enemyNova(enemy, Math.floor(wave/4) + 30, enemy.damage);
                    // if (wave > 150) spawnEnemy(enemy.x - 500 + Math.random*1000, enemy.y - 500 + Math.random*1000, 30, (200 + time*1.5)*1.05**wave*250*(1.04/1.05)**(wave-ascWave)*bm, (200 + time*1.5)*1.05**wave*250*(1.04/1.05)**(wave-ascWave), 8, "#550000", 1, 20, 20, (6 + time*0.0015)*1.01**wave*2*(1.008/1.01)**(wave-ascWave), './assets/enemies/novaenemy.png');
                }
            })
            novaTimer = 0;
        }
    })

    campers = SPGunits + SACunits + YACunits;
        
    projectiles.forEach((projectile, index) => {
        projectile.lifeTime--;
        if (projectile.lifeTime <= 0) {
            projectiles.splice(index, 1);
        }
        projectile.update();
    });

    enemies.forEach((enemy, indexe) => {
        let angle = Math.atan2(enemy.y, enemy.x);
        if (Math.hypot(enemy.x, enemy.y) < 30) {
            enemy.velocity = {x: 0, y: 0};
        } else {
            let wind = false;
            units.forEach((unit) => {
                if (unit.type == "Windspire" && Math.hypot(enemy.x - unit.m*50 + 25, enemy.y - unit.n*50 + 25) < 500) wind = true;  
            })
            let homesteadDist = Math.hypot(enemy.x, enemy.y);
            if (winnable == false || enemy.radius >= 150) {
                if (wind == false && advance == false) enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*chilled*homesteadwarp, y: -Math.sin(angle)*(5 + wave*0.06)*chilled*homesteadwarp};
                else if (wind == false && advance == true) enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*chilled, y: -Math.sin(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*chilled*homesteadwarp};
                else if (wind == true && advance == true) enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*windMultiplier*chilled, y: -Math.sin(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*windMultiplier*chilled*homesteadwarp};
                else enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*windMultiplier*chilled*homesteadwarp, y: -Math.sin(angle)*(5 + wave*0.06)*windMultiplier*chilled};
            } else {
                if (wind == false && advance == false) enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*chilled*homesteadwarp*3, y: -Math.sin(angle)*(5 + wave*0.06)*chilled*3};
                else if (wind == false && advance == true) enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*chilled*3, y: -Math.sin(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*chilled*homesteadwarp*3};
                else if (wind == true && advance == true) enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*windMultiplier*chilled*3, y: -Math.sin(angle)*(5 + wave*0.06)*4*(homesteadDist/10000/Math.sqrt(2) + 0.2)*windMultiplier*chilled*homesteadwarp*3};
                else enemy.velocity = {x: -Math.cos(angle)*(5 + wave*0.06)*windMultiplier*chilled*homesteadwarp*3, y: -Math.sin(angle)*(5 + wave*0.06)*windMultiplier*chilled*3};
            }
            
        }
        if (pause % 2 == 0) enemy.update();
        else enemy.draw();

        projectiles.forEach((projectile, indexp) => {
            let distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance - enemy.radius - projectile.radius <= 0) {
                if (projectile.isCB == true) enemies[indexe].health *= 0.95
                rTotal = 0;
                for (let i = 0; i < 8; i++) rTotal += resources[i];
                let resourceEffects = lrb ? Math.log10(rTotal)/20 : 0;
                enemies[indexe].health -= projectile.damage*(1 + 0.15*globalPower)*(1 + (0.02 + 0.01*meditationBoost)*meditationStacks)*(1 + 0.3*staffunits + 0.3*strengthunits)*(1 + confidenceStacks)*unLagBuff*Math.max(1, leaderBoost*leaderBoosted)*fc*0.98**fcstacks*0.97**mtstacks*1.02**vap*lengthboost**wave*1.15**bellStacks*(1 + 0.01*rsc*upgradesResearched)*(1 + resourceEffects)*(matted ? (1 + 0.03*Math.min(enemies.length, 30)) : 1);
                if (projectile.radius < 7)enemy.x += implevel*3;
                if (projectile.radius < 7) enemy.y += implevel*3;
                if (leechBoost == 3) charge++;
                if (resources[7] < 100 && charge >= 1000) {
                    charge -= 1000;
                    resources[7] += 1;
                }
                if (Math.random() > piercechance) projectiles[indexp].pierce -= 1;
                if (projectiles[indexp].pierce <= 0) {
                    projectiles.splice(indexp, 1);
                }
            }
        })

        if (enemies[indexe].health <= 0) {
            if (deathdebuff) {
                enemies.forEach((enemy) => {
                    enemy.health *= 0.9;
                })
            }
            enemyDeath(enemy);
            enemies.splice(indexe, 1);
        }
    });

    let brittle = 1;
    if (SACBoost == true) brittle = 0.992**SACunits;
    
    enemyprojectiles.forEach((enemyprojectile, index) => {
        enemyprojectile.update();
        if (enemyprojectile.lifeTime <= 0) {
            enemyprojectiles.splice(index, 1);
        }
        if (enemyprojectile.x < 300 && enemyprojectile.y < 200) {
            let wind = false;
            units.forEach((unit) => {
                if (unit.type == "Windspire" && Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25) < 500) wind = true;  
            })
            if (wind == false) homestead.health -= enemyprojectile.damage*brittle*0.95**rncstacks*chilled*wb*0.99**wbstacks*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost;
            else homestead.health -= enemyprojectile.damage*windMultiplier*brittle*0.95**rncstacks*chilled*wb*0.99**wbstacks*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost;
            enemyprojectiles.splice(index, 1);
            if (homestead.health <= 0) {
                dead = true;
            }
        }
        units.forEach((unit, indexu) => {
            let distance = Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25);
            if (distance - 25 - enemyprojectile.radius <= 0) {
                let wind = false;
                units.forEach((unit) => {
                    if (unit.type == "Windspire" && Math.hypot(enemyprojectile.x - unit.m*50 + 25, enemyprojectile.y - unit.n*50 + 25) < 500) wind = true;  
                })
                if (wind == false) units[indexu].health -= enemyprojectile.damage*brittle*0.95**rncstacks*chilled*wb*0.99**wbstacks*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost;
                else units[indexu].health -= enemyprojectile.damage*windMultiplier*brittle*0.95**rncstacks*chilled*wb*0.99**wbstacks*(1 - 0.01*absp)*0.95**htstacks*0.92**tmstacks*0.8**farmdr*1.75**bellStacks*0.85**songBoost*ddamageboost;
                enemyprojectiles.splice(index, 1);
                if (units[indexu].health <= 0) {
                    tiles[unit.n][unit.m] = null;
                    units.splice(indexu, 1);
                }
            }
        })
    });
    
    leaderBoost = 1;
    units.forEach((unit, index) => {
        if (unit.type == "SPG" || unit.type == "SAC" || unit.type == "YAC") {
            let adjacentYACs = 0;
            if (YACBoost == true) adjacentYACs = applyYACBuffs(tiles[unit.n][unit.m], getAdjacent(unit));
            let adjacentLTs = applyLTBuffs(tiles[unit.n][unit.m], getAdjacent(unit));
            let adjacentLeaders = applyLeaderBuffs(tiles[unit.n][unit.m], getAdjacent(unit));
            let adjacentCampfires = applyCampfireBuffs(tiles[unit.n][unit.m], getAdjacent(unit));
            let adjacentMagmas = applyMagmaBuffs(tiles[unit.n][unit.m], getAdjacent(unit));
            let supportBuffs = (1 + adjacentYACs*(0.1 + 0.025*buffBoost))*(1 + adjacentLTs*(0.1 + 0.05*buffBoost))*(1 + adjacentLeaders*(0.2 + 0.1*buffBoost))*(1 + adjacentCampfires*0.5)*(1 + adjacentMagmas*0.25)*(1 + coordination*0.02);
            if (adjacentLTs + adjacentLeaders >= 2)  {
                supportBuffs *= (1 + 0.6*duoBoost);
                if (adjacentLTs + adjacentLeaders >= 4 && duoBoost >= 3) supportBuffs *= (1 + 0.1*adjacentLTs + 0.1*adjacentLeaders);
            }
            if (duoBoost >= 4) supportBuffs *= 1.01**leaderunits;
            if (unit.type == "SPG" && SPGBoost == true) supportBuffs *= 3;
            if (LTEff > 1) supportBuffs *= (1 + 1.01**LTunits);
            if (leaderEff > 1) supportBuffs *= (1 + 0.001*experienceStacks);
            supportBuffs *= (1 + 0.002*sportBoost*campers);
            unit.supportBuffs = supportBuffs;
        } else if (unit.type == "Leader") {
            leaderBoost += 0.01;
        } else {
            unit.supportBuffs = 1;  
        }
        unit.draw();
        unit.update();
        
    });

    upgradeX = Math.floor((mousePos.x - 440)/50);
    upgradeY = Math.floor((mousePos.y - (canvas.height - rows*50 - 67))/50);

    if (onMouse == "SPG") {
        ctx.fillStyle = "#C67936";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "SAC") {
        ctx.fillStyle = "#646464";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "YAC") {
        ctx.fillStyle = "#6B3E2E";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "LT") {
        ctx.fillStyle = "#111111";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "Leader") {
        ctx.fillStyle = "#0B8E3A";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "Farm") {
        ctx.fillStyle = "#004400";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "Cave" && wave > 20) {
        ctx.fillStyle = "#666666";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "Compressor" && wave > 45) {
        ctx.fillStyle = "#888844";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "Mine" && wave > 65) {
        ctx.fillStyle = "#3D251E";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (onMouse === "Windspire" && wave > 30) {
        ctx.fillStyle = "#333333";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI*2, true);
        ctx.fill();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#ADD8E6";
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 500, 0, Math.PI*2, true);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    
    if (pause % 2 == 0 && dead == false) wavetimer -= ht;
    if (wavetimer <= 0) {
        for (let i = 0; i < Math.floor(wave/5) + 1 + (tomblevel >= 4 ? 1 : 0) + (tomblevel >= 3 ? 1 : 0); i++) {
            if (types == true && Math.random() < 0.5) spawnEnemy(3000 + 1000*spireBoost + Math.random()*(7000 - 1000*spireBoost), 3000 + 1000*spireBoost + Math.random()*(7000 - 1000*spireBoost), 30, (200 + time*0.6)*1.05**wave*2.5, (200 + time*0.6)*1.05**wave*2.5, 6, "#000000", 1, 40, 40, (6 + time*0.001)*1.01**wave/4, './assets/enemies/multienemy.png');
            else spawnEnemy(3000 + 1000*spireBoost + Math.random()*(7000 - 1000*spireBoost), 3000 + 1000*spireBoost + Math.random()*(7000 - 1000*spireBoost), 30, (200 + time*0.6)*1.05**wave*2.5/3, (200 + time*0.6)*1.05**wave*2.5/3, 6, "#000000", 1, 40, 40, (6 + time*0.001)*1.01**wave, './assets/enemies/enemy.png');
        }
            if (wave >= 30) wavetimer = 420;
        else wavetimer = 660;
        if (wave >= 51) {
            for (let i = 0; i < 8; i++) {
                resources[i] *= 1.05;
            }
            homestead.maxhealth += 100;
            homestead.health += 300;
        }
        wave++;
        if (wave > 150) lootMultiplier *= 1.05;
        if (leaderEff > 1) experienceStacks += leaderunits;
        switch(wave) {
            case 2: appendUpgrade(reinforcements); break;
            case 3: appendUpgrade(uberfarming); break;
            case 4: appendUpgrade(b); break;
            case 5: appendUpgrade(impale); break;
            case 6: appendUpgrade(ka); break;
            case 7: appendUpgrade(t1); break;
        }
    }
    
    

    ctx.fillStyle = "#000000";
    ctx.fillRect(40, 40, 200, 420);
    ctx.fillStyle = "#DDDDDD";
    ctx.fillRect(42, 42, 196, 416);

    ctx.fillStyle = "#000000";
    ctx.font = "25px Courier New";
    ctx.fillText("Tomb HP", 86, 70);
    if (homestead.health / homestead.maxhealth < 0.33) {
        ctx.fillStyle = "#FF0000";
    } else if (homestead.health / homestead.maxhealth < 0.67) {
        ctx.fillStyle = "#FFFF00";
    } else {
        ctx.fillStyle = "#00FF00";
    }
    
    ctx.fillRect(42, 75, Math.floor(196*homestead.health/homestead.maxhealth), 30);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(simplify(homestead.health) + "/" + simplify(homestead.maxhealth), 140, 100);
    ctx.textAlign = "left";
    
    for (let i = 0; i < 8; i++) {
        if (resources[i] > 0) {
            ctx.fillText(simplify(resources[i]), 90, 150 + 40*i);
            ctx.drawImage(getImage(resourceImages[i]), 50, 128 + 40*i, 30, 30);
        }
    }
    

    ctx.fillStyle = "#FF0000";
    ctx.font = "30px Courier New";
    ctx.textAlign = "center";
    if (Math.floor((time%3600)/60) < 10) ctx.fillText("Wave " + wave + "    " + Math.floor(time/3600) + ":0" + Math.floor((time%3600)/60), canvas.width / 2, 60);
    else ctx.fillText("Wave " + wave + "    " + Math.floor(time/3600) + ":" + Math.floor((time%3600)/60), canvas.width / 2, 60);
    ctx.fillText("New graverobbers in " + Math.floor(wavetimer / 60), canvas.width / 2, 95);
    ctx.textAlign = "left";

    if (display != "none") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(40, canvas.height - 260, 400, 200);
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(42, canvas.height - 258, 396, 196);
    }

    if (display == "units") {
        ctx.fillStyle = "#C67936";
        ctx.beginPath();
        ctx.arc(120, canvas.height - 200, 20, 0, Math.PI*2, true);
        ctx.fill();
        ctx.fillStyle = "#646464";
        ctx.beginPath();
        ctx.arc(200, canvas.height - 200, 20, 0, Math.PI*2, true);
        ctx.fill();
        ctx.fillStyle = "#6B3E2E";
        ctx.beginPath();
        ctx.arc(280, canvas.height - 200, 20, 0, Math.PI*2, true);
        ctx.fill();
        ctx.fillStyle = "#111111";
        ctx.beginPath();
        ctx.arc(360, canvas.height - 200, 20, 0, Math.PI*2, true);
        ctx.fill();
        ctx.fillStyle = "#0B8E3A";
        ctx.beginPath();
        ctx.arc(120, canvas.height - 120, 20, 0, Math.PI*2, true);
        ctx.fill();
    } else if (display == "farming") {
        ctx.fillStyle = "#004400";
        ctx.beginPath();
        ctx.arc(120, canvas.height - 200, 20, 0, Math.PI*2, true);
        ctx.fill();
        if (wave > 20) {
            ctx.fillStyle = "#666666";
            ctx.beginPath();
            ctx.arc(200, canvas.height - 200, 20, 0, Math.PI*2, true);
            ctx.fill();
        }
        if (wave > 45) {
            ctx.fillStyle = "#888844";
            ctx.beginPath();
            ctx.arc(280, canvas.height - 200, 20, 0, Math.PI*2, true);
            ctx.fill();
        }
        if (wave > 65) {
            ctx.fillStyle = "#3D251E";
            ctx.beginPath();
            ctx.arc(360, canvas.height - 200, 20, 0, Math.PI*2, true);
            ctx.fill();
        }
        if (wave > 101) {
            ctx.fillStyle = "#BEC2CB";
            ctx.beginPath();
            ctx.arc(120, canvas.height - 120, 20, 0, Math.PI*2, true);
            ctx.fill();
        }
    } else if (display == "misc") {
        if (wave > 30 && spireWarped == false) {
            ctx.fillStyle = "#333333";
            ctx.beginPath();
            ctx.arc(120, canvas.height - 200, 20, 0, Math.PI*2, true);
            ctx.fill();
        }
        if (wave > 50) {
            if (campfirePrestige == 0 && wave <= 150) {
                ctx.fillStyle = "#BB0000";
                ctx.beginPath();
                ctx.arc(200, canvas.height - 200, 20, 0, Math.PI*2, true);
                ctx.fill();
            } else if (campfirePrestige == 1 && wave <= 150) {
                ctx.fillStyle = "#DD0000";
                ctx.beginPath();
                ctx.arc(200, canvas.height - 200, 20, 0, Math.PI*2, true);
                ctx.fill();
            } else if (campfirePrestige == 2 && wave <= 150) {
                ctx.fillStyle = "#FF0000";
                ctx.beginPath();
                ctx.arc(200, canvas.height - 200, 20, 0, Math.PI*2, true);
                ctx.fill();
            }if (wave > 90) {
                ctx.fillStyle = "#301934";
                ctx.beginPath();
                ctx.arc(280, canvas.height - 200, 20, 0, Math.PI*2, true);
                ctx.fill();
            }
        }
    }

    
    if (description != null) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(40, canvas.height - 560, 400, 300);
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(42, canvas.height - 558, 396, 296);
        ctx.fillStyle = "#000000";
        ctx.font = "25px Courier New";
        if (description == "SPG") {
            ctx.fillText("Necropolis Guard", 50, canvas.height - 530, 370);
            displayCosts(SPGBaseCost, 1.4, SPGunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(550*(1 + healthBoost))} HP, ${Math.floor(20*(1 + globalPower*0.15)*10)/10} DMG, 1500 RNG, 25 RLD`, 50, canvas.height - 400, 370);
            ctx.font = "20px Courier New";
            ctx.fillText("Defeats graverobbers by throwing", 50, canvas.height - 350, 370);
            ctx.fillText("rocks at them.", 50, canvas.height - 320, 370);
        } else if (description == "SAC") {
            ctx.fillText("Cursed Tablet", 50, canvas.height - 530, 370);
            displayCosts(SACBaseCost, 1.4, SACunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(1000*(1 + healthBoost))} HP, 2 DMG, 500 RNG, 1 RLD`, 50, canvas.height - 400, 370);
            ctx.fillText("Graverobbers in close proximity", 50, canvas.height - 350, 370);
            ctx.fillText("will take constant damage.", 50, canvas.height - 320, 370);
        } else if (description == "YAC") {
            ctx.fillText("Falling Rocks", 50, canvas.height - 530, 370);
            displayCosts(YACBaseCost, 1.4, YACunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(1400*(1 + healthBoost))} HP, 100 DMG, 90 RNG, 2 RLD`, 50, canvas.height - 400, 370);
            ctx.fillText("Drops rocks on the graverobbers'", 50, canvas.height - 350, 370);
            ctx.fillText("head if they stand under it.", 50, canvas.height - 320, 370);
        } else if (description == "LT") {
            ctx.fillText("Hidden Hole", 50, canvas.height - 530, 370);
            displayCosts(LTBaseCost, 1.4, LTunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(6000*(1 + healthBoost))} HP, Infinity DMG, 50 RNG, 1 RLD`, 50, canvas.height - 400, 370);
            ctx.fillText("Graverobbers gain a small chance of", 50, canvas.height - 350, 370);
            ctx.fillText(`instantly dying when they move`, 50, canvas.height - 320, 370);
            ctx.fillText("directly over the hole.", 50, canvas.height - 290, 370);
        } else if (description == "leader") {
            ctx.fillText("Toxic Powder", 50, canvas.height - 530, 370);
            displayCosts(leaderBaseCost, 1.5, leaderunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(10000*(1 + healthBoost))} HP, 5 DMG, 100 RNG, 1 RLD`, 50, canvas.height - 400, 370);
            ctx.fillText("Poisons enemies when they walk through,", 50, canvas.height - 370, 370);
            ctx.fillText(`making them take constant damage.`, 50, canvas.height - 340, 370);
        } else if (description == "farm") {
            ctx.fillText("Farm", 50, canvas.height - 530, 370);
            displayCosts(farmBaseCost, 1.2, farmunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(1000*(1 + healthBoost))} HP, ${simplify(50*(1 + 3*farmBoost)*(1 + wave/4)*farmBuff*farmEff)} food/sec`, 50, canvas.height - 400, 370);
            ctx.fillText("An essential building that generates", 50, canvas.height - 350, 370);
            ctx.fillText("food to buy other units.", 50, canvas.height - 320, 370);
        } else if (description == "cave" && wave > 20) {
            ctx.fillText("Cave", 50, canvas.height - 530, 370);
            displayCosts(caveBaseCost, 1.3, caveunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(7000*(1 + healthBoost))} HP, ${simplify((wave/8 + 1)*600*farmBuff*caveEff)} stone/sec`, 50, canvas.height - 400, 370);
            ctx.fillText("Although dark, caves are filled", 50, canvas.height - 350, 370);
            ctx.fillText("with stone.", 50, canvas.height - 320, 370);
        } else if (description == "compressor" && wave > 45) {
            ctx.fillText("Compressor", 50, canvas.height - 530, 370);
            displayCosts(compressorBaseCost, 1.35, compressunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(20000*(1 + healthBoost))} HP, ${simplify((wave/10 + 1)*400*farmBuff*compEff)} copper/sec`, 50, canvas.height - 400, 370);
            ctx.fillText("A nice building to compress", 50, canvas.height - 350, 370);
            ctx.fillText("some copper!", 50, canvas.height - 320, 370);
        } else if (description == "mine" && wave > 65) {
            ctx.fillText("Mine", 50, canvas.height - 530, 370);
            displayCosts(mineBaseCost, 1.4, mineunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(25000*(1 + healthBoost))} HP, ${simplify((wave/15 + 1)*300*farmBuff*mineEff)} titanium/sec`, 50, canvas.height - 400, 370);
            ctx.fillText("A good site to dig up", 50, canvas.height - 350, 370);
            ctx.fillText("titanium.", 50, canvas.height - 320, 370);
        } else if (description == "pressurizer" && wave > 101) {
            ctx.fillText("Pressurizer", 50, canvas.height - 530, 370);
            displayCosts(pressurizerBaseCost, 1.45, pressurizerunits);
            ctx.font = "20px Courier New";
            ctx.fillText(`${simplify(25000*(1 + healthBoost))} HP, ${simplify((wave/20 + 1)*240*farmBuff*pressEff)} diamond/sec`, 50, canvas.height - 400, 370);
            ctx.fillText("Generates diamond from", 50, canvas.height - 350, 370);
            ctx.fillText("graphite.", 50, canvas.height - 320, 370);
        } else if (description == "windspire" && wave > 30) {
            ctx.fillText("Windspire", 50, canvas.height - 530, 370);
            displayCosts(windspireBaseCost, 2.1, windspireunits);
            ctx.font = "15px Courier New";
            ctx.fillText(`${simplify(11000*(1 + healthBoost))} HP, 500 RNG`, 50, canvas.height - 390, 370);
            ctx.fillText("A non-offensive but essential", 50, canvas.height - 370, 370);
            ctx.fillText("support tower. All graverobbers", 50, canvas.height - 350, 370);
            ctx.fillText("within 500 units will be slowed", 50, canvas.height - 330, 370);
            ctx.fillText(`by ${Math.floor((1 - 0.8**(spireBoost + 1))*100)}%, and will deal ${Math.floor((1 - 0.8**(spireBoost + 1))*100)}% less`, 50, canvas.height - 310, 370);
            ctx.fillText("damage to all units. Does not", 50, canvas.height - 290, 370);
            ctx.fillText("stack with other windspires.", 50, canvas.height - 270, 370);
        } else if (description == "campfire" && wave > 50) {
            ctx.fillText("Campfire", 50, canvas.height - 530, 370);
            displayCosts(campfireBaseCost, 1.7, campfireunits);
            ctx.font = "15px Courier New";
            ctx.fillText(`${simplify(6500*(1 + healthBoost))} HP`, 50, canvas.height - 390, 370);
            ctx.fillText("Another important support tower.", 50, canvas.height - 370, 370);
            ctx.fillText("All adjacent campers will do +50%", 50, canvas.height - 350, 370);
            ctx.fillText("damage, which stacks additively with", 50, canvas.height - 330, 370);
            ctx.fillText("other campfires and compounds with", 50, canvas.height - 310, 370);
            ctx.fillText("bonuses from LTs/leaders or global", 50, canvas.height - 290, 370);
            ctx.fillText("damage buffs.", 50, canvas.height - 270, 370);
        }
    }
    
    if (upgradeDisplay % 2 == 1) {
        if (upgrades.length == 0) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(438, canvas.height - 119, 404, 4 + 50*rows);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(440, canvas.height - 117, 400, 50*rows);
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.font = "30px Courier New";
            ctx.fillText("No upgrades available", 642, canvas.height - 80);
            ctx.textAlign = "left";
        } else {
            rows = Math.ceil(upgrades.length/8);
            ctx.fillStyle = "#000000";
            ctx.fillRect(438, canvas.height - 50*rows - 69, 404, 50*rows + 4);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(440, canvas.height - 50*rows - 67, 400, 50*rows);
            for (let i = 0; i < Math.ceil(upgrades.length/8); i++) {
                for (let j = 0; j < 8; j++) {
                    if (upgrades[i*8 + j]) {
                        let enoughResources = true;
                        for (let k = 0; k < 8; k++) {
                            if (resources[k] < upgrades[i*8 + j].cost[k]) enoughResources = false;
                        }
                        ctx.drawImage(getImage(upgrades[i*8 + j].image), 440 + 50*j, canvas.height - 50*Math.ceil(upgrades.length/8) + 50*i - 67, 50, 50);
                        ctx.fillStyle = "#000000";
                        ctx.globalAlpha = 0.7;
                        if (enoughResources == false) ctx.fillRect(440 + 50*j, canvas.height - 50*Math.ceil(upgrades.length/8) + 50*i - 67, 50, 50);
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }
    }
    
    if (abilityDisplay % 2 == 1) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(438, canvas.height - 119, 404, 54);
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(440, canvas.height - 117, 400, 50);
        ctx.fillStyle = "#000000";
        for (let i = 0; i < 8; i++) {
            ctx.drawImage(getImage(abilities[i].image), 440 + 50*i, canvas.height - 117, 50, 50);
            if (resources[7] < abilities[i].cost) {
                ctx.globalAlpha = 0.7;
                ctx.fillRect(440 + 50*i, canvas.height - 117, 50, 50);
                ctx.globalAlpha = 1;
            }
        }
        if (abilityIndex != null) {
            ctx.textAlign = "left";
            ctx.fillStyle = "#000000";
            ctx.fillRect(438, canvas.height - 517, 404, 400);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(440, canvas.height - 515, 400, 396);
            ctx.font = "30px Courier New";
            ctx.fillStyle = "#000000";
            ctx.fillText(abilities[abilityIndex].name, 450, canvas.height - 485, 300);
            ctx.drawImage(getImage("./assets/resources/power.png"), 750, canvas.height - 510, 30, 30);
            ctx.fillText(abilities[abilityIndex].cost, 780, canvas.height - 485, 380);
            ctx.font = "16px Courier New";
            let abilityDescArray = abilities[abilityIndex].description.split(" ");
            for (let i = 0; i < Math.ceil(abilityDescArray.length / 5); i++) {
                let rowDescArray = [];
                for (let j = 0; j < 5; j++) {
                    rowDescArray.push(abilityDescArray[i*5 + j]);
                }
                let rowDesc = rowDescArray.join(' ');
                ctx.fillText(rowDesc, 450, canvas.height - 415 + 18*i, 380);
            }
        }
    }
    
    if (shownUpgrade != null) {
        ctx.textAlign = "left";
        ctx.fillStyle = "#000000";
        ctx.fillRect(438, canvas.height - rows*50 - 467, 404, 400);
        ctx.fillStyle = "#DDDDDD";
        ctx.fillRect(440, canvas.height - rows*50 - 465, 400, 396);
        ctx.font = "30px Courier New";
        ctx.fillStyle = "#000000";  
        ctx.fillText(shownUpgrade.name, 450, canvas.height - rows*50 - 435, 380);
        ctx.font = "16px Courier New";
        displayUpgradeCosts(shownUpgrade.cost);
        let upgradeDescArray = shownUpgrade.description.split(" ");
        for (let i = 0; i < Math.ceil(upgradeDescArray.length / 6); i++) {
            let rowDescArray = [];
            for (let j = 0; j < 6; j++) {
                rowDescArray.push(upgradeDescArray[i*6 + j]);
            }
            let rowDesc = rowDescArray.join(' ');
            ctx.fillText(rowDesc, 450, canvas.height - rows*50 - 265 + 18*i, 380);
        }
    }

    let meditationCaps = [40, 90, 150, 250, 500];
    let meditationFarms = farmunits + caveunits + compressunits + mineunits + pressurizerunits;

    if (meditationBoost > 0) {
        meditationStacks = Math.min(meditationFarms, meditationCaps[meditationBoost - 1]);
        ctx.drawImage(getImage('./assets/upgrades/meditation.png'), canvas.width - 175, 30, 40, 40);
        ctx.fillStyle = "#000000";
        ctx.font = "30px Courier New";
        ctx.fillText("+" + Math.floor((2 + meditationBoost)*meditationStacks) + "%", canvas.width - 120, 60, 100);
    }

    switch(confidenceBoost) {
        case 1: confidenceStacks = Math.min(2, 0.004*enemiesKilled); break;
        case 2: confidenceStacks = Math.min(4.9, 0.007*enemiesKilled); break;
        case 3: confidenceStacks = Math.min(9, 0.009*enemiesKilled); break;
        case 4: confidenceStacks = Math.min(20, 0.01*enemiesKilled); break;
        case 5: confidenceStacks = 0.011*enemiesKilled; break;
    }
    
    if (confidenceBoost > 0) {
        ctx.drawImage(getImage('./assets/upgrades/confidence.png'), canvas.width - 175, 80, 40, 40);
        ctx.fillStyle = "#000000";
        ctx.font = "30px Courier New";
        ctx.fillText("+" + Math.floor(confidenceStacks*100) + "%", canvas.width - 120, 110, 100);
    }
    
    if (leechBoost == 3) {
        ctx.drawImage(getImage('./assets/misc/charge.png'), canvas.width - 175, 130, 40, 40);
        ctx.fillStyle = "#000000";
        ctx.font = "30px Courier New";
        ctx.fillText(charge, canvas.width - 120, 160, 100);
    }

    if (experienceStacks > 0) {
        ctx.drawImage(getImage('./assets/upgrades/experiencedLeaders.png'), canvas.width - 175, 180, 40, 40);
        ctx.fillStyle = "#000000";
        ctx.font = "30px Courier New";
        ctx.fillText("+" + Math.floor(0.1*experienceStacks) + "%", canvas.width - 120, 210, 100);
    }

    if (lrb == true) {
        ctx.drawImage(getImage('./assets/upgrades/steam5.png'), canvas.width - 175, 230, 40, 40);
        ctx.fillStyle = "#000000";
        ctx.font = "30px Courier New";
        ctx.fillText("+" + Math.floor(Math.log10(rTotal)*5) + "%", canvas.width - 120, 260, 100);
        
    }

    if (homesteadwarp != 1) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "#CBC3E3";
        ctx.fillRect(0, 0, 10000, 10000);
        ctx.globalAlpha = 1;
    }
    

    if (dead === true) {
        undisplay();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#000000";
        ctx.fillRect(renderingPosX(player.x) - canvas.width / 2, renderingPosY(player.y) - canvas.height / 2, canvas.width, canvas.height);
        ctx.font = "90px Courier New";
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.globalAlpha = 1;
        ctx.fillText("You died.", canvas.width / 2, canvas.height / 2 - 45);
        ctx.font = "30px Courier New";
        ctx.fillText("Waves survived: " + (wave - 1), canvas.width / 2, canvas.height / 2 + 20);
        ctx.textAlign = "left";
    }
    
    if (pause % 2 == 1) {
        ctx.font = "30px Courier New";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.fillText("[SPACE] to unpause", canvas.width - 350, 30);
    }
    
    if (intropage == 0) {
        pause = 1;
        undisplay();
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "60px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("Graverobber Defense 2", canvas.width / 2, canvas.height / 2 - 240);
        ctx.drawImage(getImage("./assets/misc/tomb5.png"), canvas.width / 2 - 150, canvas.height / 2 - 200, 300, 200);
        ctx.font = "30px Courier New";
        ctx.fillText("Protect the tombs from", canvas.width / 2, canvas.height / 2 + 60);
        ctx.fillText("potential robbers trying", canvas.width / 2, canvas.height / 2 + 100);
        ctx.fillText("to steal the wealth inside.", canvas.width / 2, canvas.height / 2 + 140);
        ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 250);
        ctx.textAlign = "left";
    } else if (intropage == 1) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("The purpose of this game is to use", canvas.width / 2, canvas.height / 2 - 100);
        ctx.fillText("traps to defeat grave robbers. Try", canvas.width / 2, canvas.height / 2 - 60);
        ctx.fillText("to progress as long as possible", canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText("without getting your grave robbed.", canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("You lose if the tomb HP bar goes to 0.", canvas.width / 2, canvas.height / 2 + 100);
        ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 160);
        ctx.textAlign = "left";
    } else if (intropage == 2) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("You can purchase units and upgrades", canvas.width / 2, canvas.height / 2 - 80);
        ctx.fillText("by clicking the buttons near the", canvas.width / 2, canvas.height / 2 - 40);
        ctx.fillText("bottom of the page. Resources are", canvas.width / 2, canvas.height / 2);
        ctx.fillText("displayed in the top left corner and", canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText("you will unlock more as you go.", canvas.width / 2, canvas.height / 2 + 80);
        ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 160);
        redisplay();
    } else if (intropage == 3) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("Use w, a, s, and d to move.", canvas.width / 2, canvas.height / 2 - 80);
        ctx.fillText("Pressing the space bar pauses or", canvas.width / 2, canvas.height / 2 - 40);
        ctx.fillText("unpauses the game. Traps/units are", canvas.width / 2, canvas.height / 2);
        ctx.fillText("placed by simply clicking the item", canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText("and then clicking again on the map", canvas.width / 2, canvas.height / 2 + 80);
        ctx.fillText("to place it.", canvas.width / 2, canvas.height / 2 + 120);
        ctx.fillText("Click anywhere to continue", canvas.width / 2, canvas.height / 2 + 160);
        redisplay();
    }
    ctx.globalAlpha = 1;
    
    if (wave == 50 && enemies.length == 0 && empowered == false && empowerdesc == 0) {
        onMouse = null;
        pause = 1;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFA500";
        ctx.font = "60px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("EMPOWERMENT", canvas.width / 2, canvas.height / 2 - 240);
        ctx.font = "25px Courier New";
        let empowermentArray = empowermentDesc.split(" ");
        for (let i = 0; i < Math.ceil(empowermentArray.length / 8); i++) {
            let rowDescArray = [];
            for (let j = 0; j < 8; j++) {
                rowDescArray.push(empowermentArray[i*8 + j]);
            }
            let rowDesc = rowDescArray.join(' ');
            ctx.fillText(rowDesc, canvas.width / 2, canvas.height / 2 - 160 + 30*i, 1200);
        }
        
        if (empowerboosted == false) {
            for (let i = 0; i < 8; i++) {
                resources[i] *= 10; 
            }
            resources[5] += 1000;
            empowerboosted = true;
            globalResourceBoost *= 4;
            unLagBuff = 4;
            homestead.maxhealth *= 10;
            homestead.health = homestead.maxhealth;
            lengthboost = 1.002;
        }
        undisplay();
    } else if (wave == 50 && enemies.length == 0 && empowered == false) {
        empowered = true;
        redisplay();    
        pause = 0;
        fireunlocked = true;
    }

    if (wave == 100 && enemies.length == 0 && corrupted == false && corruptdesc == 0) {
        onMouse = null;
        pause = 1;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FF00FF";
        ctx.font = "60px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("CORRUPTION", canvas.width / 2, canvas.height / 2 - 240);
        ctx.font = "25px Courier New";
        let corruptArray = corruptionDesc.split(" ");
        for (let i = 0; i < Math.ceil(corruptArray.length / 8); i++) {
            let rowDescArray = [];
            for (let j = 0; j < 8; j++) {
                rowDescArray.push(corruptArray[i*8 + j]);
            }
            let rowDesc = rowDescArray.join(' ');
            ctx.fillText(rowDesc, canvas.width / 2, canvas.height / 2 - 160 + 30*i, 1200);
        }
        
        if (corruptboosted == false) {
            for (let i = 0; i < 8; i++) {
                resources[i] *= 10; 
            }
            resources[7] = 100;
            corruptboosted = true;
            globalResourceBoost *= 2;
            homestead.maxhealth *= 10;
            homestead.health = homestead.maxhealth;
            volcanounits = 0;
            magmaunits = 0;
            lengthboost = 1.006;
        }
        undisplay();
    } else if (wave == 100 && enemies.length == 0 && corrupted == false) {
        corrupted = true;
        redisplay();    
        pause = 0;
    }

    if (wave == 150 && enemies.length == 0 && apocalyptic == false && apocdesc == 0) {
        onMouse = null;
        pause = 1;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FF0000";
        ctx.font = "60px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("INSANITY", canvas.width / 2, canvas.height / 2 - 240);
        ctx.font = "25px Courier New";
        let apocArray = apocDesc.split(" ");
        for (let i = 0; i < Math.ceil(apocArray.length / 8); i++) {
            let rowDescArray = [];
            for (let j = 0; j < 8; j++) {
                rowDescArray.push(apocArray[i*8 + j]);
            }
            let rowDesc = rowDescArray.join(' ');
            ctx.fillText(rowDesc, canvas.width / 2, canvas.height / 2 - 160 + 30*i, 1200);
        }
        
        if (apocboosted == false) {
            for (let i = 0; i < 8; i++) {
                resources[i] *= 10; 
            }
            apocboosted = true;
            globalResourceBoost *= 2;
            homestead.maxhealth *= 10;
            homestead.health = homestead.maxhealth;
            volcanounits = 0;
            magmaunits = 0;
            lengthboost = 1.008;
            ddamageboost = 1.65;
        }
        undisplay();
    } else if (wave == 150 && enemies.length == 0 && apocalyptic == false) {
        apocalyptic = true;
        redisplay();    
        pause = 0;
    }
    
    if (rejuv == true) {
        units.forEach((unit, index) => {
            let homesteadDist = Math.hypot(unit.m*50 - 25, unit.n*50 - 25);
            unit.health += homesteadDist*15/10000/Math.sqrt(2);
            if (unit.health > unit.maxhealth) unit.health = unit.maxhealth;
        })  
    }

    if (won == true) {
        undisplay();
        onMouse = null;
        pause = 1;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#00CC00";
        ctx.font = "60px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("VICTORY", canvas.width / 2, canvas.height / 2 - 180);
        ctx.font = "25px Courier New";
        ctx.fillStyle = "#DDDDDD";
        ctx.fillText("Stats", canvas.width / 2, canvas.height / 2 - 80);
        if (Math.floor((time%3600)/60) < 10) ctx.fillText("Time Taken: " + Math.floor(time/3600) + ":0" + Math.floor((time%3600)/60), canvas.width / 2, canvas.height / 2 - 30);
        else ctx.fillText("Time Taken: " + Math.floor(time/3600) + ":" + Math.floor((time%3600)/60), canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillText("Waves Cleared: " + (wave - 1), canvas.width / 2, canvas.height / 2);
        ctx.fillText("Enemies Defeated: " + enemiesKilled, canvas.width / 2, canvas.height / 2 + 30);
    }

    if (chilled < 1) {
        chilltime--;
        if (chilltime <= 0) chilled = 1;
    }
    if (wb < 1) {
        wbtime--;
        if (wbtime <= 0) wb = 1;
    }

    if (fc > 1) {
        fctime--;
        if (fctime <= 0) fc = 1;
    }

    if (ht < 1) {
        httime--;
        if (httime <= 0) ht = 1;
    }
    resources[7] = Math.min(100 + chargeStorage, resources[7]);
    
    ctx.textAlign = "center";
    if (infohover != null) {
        if (infohover == "meditation") {
            ctx.fillStyle = "#000000";
            ctx.fillRect(canvas.width - 560, 40, 360, 100);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(canvas.width - 558, 42, 356, 96);
            ctx.font = "20px Courier New";
            ctx.fillStyle = "#000000";
            ctx.fillText("Meditation", canvas.width - 380, 64);
            ctx.font = "16px Courier New";
            ctx.fillText("Units are dealing " + Math.floor((2 + meditationBoost)*meditationStacks) + "% more", canvas.width - 380, 100, 320);
            ctx.fillText("damage for having " + meditationFarms + " farms on screen.", canvas.width - 380, 120, 320);
        } 
        if (infohover == "confidence") {
            ctx.fillStyle = "#000000";
            ctx.fillRect(canvas.width - 560, 90, 360, 100);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(canvas.width - 558, 92, 356, 96);
            ctx.font = "20px Courier New";
            ctx.fillStyle = "#000000";
            ctx.fillText("Confidence", canvas.width - 380, 114);
            ctx.font = "16px Courier New";
            ctx.fillText("Units are dealing " + Math.floor(confidenceStacks*100) + "% more", canvas.width - 380, 150, 320);
            ctx.fillText("damage for defeating " + enemiesKilled + " enemies.", canvas.width - 380, 170, 320);
        }
        if (infohover == "charge") {
            ctx.fillStyle = "#000000";
            ctx.fillRect(canvas.width - 560, 140, 360, 140);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(canvas.width - 558, 142, 356, 136);
            ctx.font = "20px Courier New";
            ctx.fillStyle = "#000000";
            ctx.fillText("Charge", canvas.width - 380, 164);
            ctx.font = "16px Courier New";
            ctx.fillText("You have " + charge + " units of charge,", canvas.width - 380, 200, 320);
            ctx.fillText("and will gain one every time an", canvas.width - 380, 220, 320);
            ctx.fillText("enemy is hit. Every 1000 units,", canvas.width - 380, 240, 320);
            ctx.fillText("you will gain 1 power.", canvas.width - 380, 260, 320);
        }
        if (infohover == "experience") {
            ctx.fillStyle = "#000000";
            ctx.fillRect(canvas.width - 560, 190, 360, 140);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(canvas.width - 558, 192, 356, 136);
            ctx.font = "20px Courier New";
            ctx.fillStyle = "#000000";
            ctx.fillText("Experience", canvas.width - 380, 214);
            ctx.font = "16px Courier New";
            ctx.fillText("Units are dealing " + Math.floor(0.1*experienceStacks) + "% more", canvas.width - 380, 250, 320);
            ctx.fillText("damage for having " + leaderunits + " leaders.", canvas.width - 380, 270, 320);
            ctx.fillText("Next wave, " + leaderunits/10 + "% will be", canvas.width - 380, 290, 320);
            ctx.fillText("added to this damage bonus.", canvas.width - 380, 310, 320);
        }
        if (infohover == "lrb") {
            ctx.fillStyle = "#000000";
            ctx.fillRect(canvas.width - 560, 240, 360, 120);
            ctx.fillStyle = "#DDDDDD";
            ctx.fillRect(canvas.width - 558, 242, 356, 116);
            ctx.font = "20px Courier New";
            ctx.fillStyle = "#000000";
            ctx.fillText("STEAM Architects", canvas.width - 380, 264);
            ctx.font = "16px Courier New";
            ctx.fillText("Units are dealing " + Math.floor(Math.log10(rTotal)*5) + "% more", canvas.width - 380, 300, 320);
            ctx.fillText("damage for having " + simplify(rTotal) + " total resources.", canvas.width - 380, 320, 320);
            ctx.fillText("This bonus scales logarithmically.", canvas.width - 380, 340, 320);
        }
    }

    displayArray = [unitchecked, farmchecked, miscchecked, upgradechecked];
    alertDisplay();

    units.forEach((unit) => {
        if (unit.type == 'Curse') {
            enemies.forEach((enemy) => {
                let distance = Math.hypot(unit.m*50 - 25 - enemy.x, unit.n*50 - 25 - enemy.y);
                if (distance < 500 && pause % 2 == 0) {
                    enemy.health -= 2;
                }
            })
        }
    })

    units.forEach((unit) => {
        if (unit.type == 'Hole') {
            enemies.forEach((enemy) => {
                let distance = Math.hypot(unit.m*50 - 25 - enemy.x, unit.n*50 - 25 - enemy.y);
                if (distance < 50 && Math.random() < 0.015 && pause % 2 == 0) {
                    enemy.health = 0;
                }
            })
        }
    })

    units.forEach((unit) => {
        if (unit.type == 'Gas') {
            enemies.forEach((enemy) => {
                let distance = Math.hypot(unit.m*50 - 25 - enemy.x, unit.n*50 - 25 - enemy.y);
                if (distance < 100) {
                    enemy.isPoisoned = true;
                }
            })
        }
    })

    if (time % 60 == 0) {
        homestead.health += healps;
        homestead.health = Math.min(homestead.health, homestead.maxhealth);
    }

    if (tomblevel >= 5) {
        if (double == true && pause % 2 == 0) {
            const angle = Math.random()*Math.PI/2;
            const velocity = {x:Math.cos(angle)*25, y:Math.sin(angle)*25};
            projectiles.push(new Projectile(5, 5, 6, "#000000", velocity, 20, 1, 175, null, false));
        }
    } else if (double == true && pause % 2 == 0 && time % 3 == 0) {
        const angle = Math.random()*Math.PI/2;
        const velocity = {x:Math.cos(angle)*25, y:Math.sin(angle)*25};
        projectiles.push(new Projectile(5, 5, 6, "#000000", velocity, 20, 1, 35, null, false));
    }
    
    updateLocation();
}
