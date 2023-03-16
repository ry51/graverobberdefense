function toggleDisplay() {
    if (display == "none") display = units;
    else display = "none";
}

function unitTab() {
    display = "units";
	unitchecked = true;
}

function farmingTab() {
    display = "farming";
	farmchecked = true;
}

function miscTab() {
    display = "misc";
	miscchecked = true;
}

function upgradesTab() {
	upgradeDisplay++;
	abilityDisplay = 0;
	upgradechecked = true;
}


function undisplay() {
    document.getElementById("toggle").style.display = "none";
    document.getElementById("units").style.display = "none";
    document.getElementById("farming").style.display = "none";
    document.getElementById("misc").style.display = "none";
	document.getElementById("upgrades").style.display = "none";
}

function redisplay() {
	document.getElementById("toggle").style.display = "initial";
    document.getElementById("units").style.display = "initial";
    document.getElementById("farming").style.display = "initial";
    document.getElementById("misc").style.display = "initial";
	document.getElementById("upgrades").style.display = "initial";
}

function alertDisplay() {
	for (let i = 0; i < 4; i++) {
		if (displayArray[i] == false) document.getElementById(selectionArray[i]).style.color = "red";
		else document.getElementById(selectionArray[i]).style.color = "black";
	}
}

