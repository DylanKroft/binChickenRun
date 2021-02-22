import Player from '/Player.js'
import Block from '/Block.js';
import Map from '/Map.js';

//loading images////////////////////////////////////////////////////////////////
const s1 = new Image();
s1.src = "src/1chicken.png";
const s2 = new Image();
s2.src = "src/2chicken.png";
const s3 = new Image();
s3.src = "src/3chicken.png";
const s4 = new Image();
s4.src = "src/4chicken.png";
const s5 = new Image();
s5.src = "src/5chicken.png";
const s6 = new Image();
s6.src = "src/6chicken.png";

const bg = new Image();
bg.src = "src/cover.png";
////////////////////////////////////////////////////////////////////////////////

let sprites = [s1, s2, s3, s4, s5, s6];

//set up canvas/////////////////////////////////////////////////////////////////
const canvas = document.getElementById("screen");
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.textAlign = "center";
ctx.font = "10px 'Press Start 2P'";
ctx.fillStyle = "white";

let game = {
    running: false,
    score: 0,
    needRestart: false,
    restarted: false,
}

const startTime = Date.now();
////////////////////////////////////////////////////////////////////////////////

//set up player character///////////////////////////////////////////////////////
const player = new Player(sprites, 50, 0, 2, 75, 75);
////////////////////////////////////////////////////////////////////////////////

const map = new Map();

//set up event listeners////////////////////////////////////////////////////////

document.addEventListener("keydown", function() {
    
    if (event.keyCode == 32 && game.needRestart) {
        resetGame();
        ctx.drawImage(bg,0,0);
        game.needRestart = false;
        game.restarted = true;

    } else if (event.keyCode == 32 && game.restarted) {
        game.restarted = false;
        game.running = true;
        draw();
        
    } else if (!game.running && event.keyCode == 32) {
        game.running = true;

    } else {
        player.getKeyPressed(event);

    }
})

document.addEventListener("keyup", function() {
    player.getKeyPressed(event);
})

////////////////////////////////////////////////////////////////////////////////

bg.onload = function() {
    ctx.drawImage(bg,0,0);
}

function resetGame() {
    game.score = 0;
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "10px 'Press Start 2P'";
    ctx.fillStyle = "white";
    map.clearBlocks();
    player.x = 50;
    player.y = 0;
    player.xMove = 0;
}

//game loop/////////////////////////////////////////////////////////////////////
function draw() {

    if (game.running) {
        let now = Date.now();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText("SCORE", 930, 50);
        ctx.fillText(game.score, 930, 70);

        map.drawTerrain(ctx);

        map.spawnBlocks(now);

        player.drawPlayer(ctx, canvas);
        player.initialMove();
        player.move();
        player.updateSprite();

        map.collisionCheck(player, game);
        
        if(!game.running) {
            ctx.font = "30px 'Press Start 2P'";
            ctx.fillText("GAME OVER", 500, 200);
            ctx.font = "10px 'Press Start 2P'";
            ctx.fillText("FINAL SCORE: " + game.score, 500, 240);

            ctx.globalCompositeOperation = 'destination-over'
            ctx.fillStyle = "#bf040e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            game.needRestart = true;


            return;    
        }
    }

    requestAnimationFrame(draw);
}

draw();

////////////////////////////////////////////////////////////////////////////////
