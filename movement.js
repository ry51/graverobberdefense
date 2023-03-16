// movement
function updateLocation() {
    if (keys["w"] && keys["a"] && player.y > 0 && pause % 2 === 0) {
        if (player.y > 0 && pause % 2 === 0) {
            player.y -= speed/Math.sqrt(2);
        }
        if (player.x > 0 && pause % 2 === 0) {
            player.x -= speed/Math.sqrt(2);
        }
    } else if (keys["w"] && keys["d"] && player.y > 0 && pause % 2 === 0) {
        if (player.y > 0 && pause % 2 === 0) {
            player.y -= speed/Math.sqrt(2);
        }
        if (player.x < 10000 && pause % 2 === 0) {
            player.x += speed/Math.sqrt(2);
        }
    } else if (keys["s"] && keys["a"] && player.y > 0 && pause % 2 === 0) {
        if (player.y < 10000 && pause % 2 === 0) {
            player.y += speed/Math.sqrt(2);
        }
        if (player.x  > 0 && pause % 2 === 0) {
            player.x -= speed/Math.sqrt(2);
        }
    } else if (keys["s"] && keys["d"] && player.y > 0 && pause % 2 === 0) {
        if (player.y < 10000 && pause % 2 === 0) {
            player.y += speed/Math.sqrt(2);
        }
        if (player.x < 10000 && pause % 2 === 0) {
            player.x += speed/Math.sqrt(2);
        }
    } else {
        if (keys["w"] && player.y  > 0 && pause % 2 === 0) {
            player.y -= speed;
        }
        if (keys["a"] && player.x  > 0 && pause % 2 === 0) {
            player.x -= speed;
        }
        if (keys["s"] && player.y < 10000 && pause % 2 === 0) {
            player.y += speed;
        }
        if (keys["d"] && player.x < 10000 && pause % 2 === 0) {
            player.x += speed;
        }
    }
}