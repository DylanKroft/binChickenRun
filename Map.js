import Block from '/Block.js';

export default class Map {

    constructor() {
        this.blocks = [];
        this.lastSpawn = 0;
        this.spawnRate = 1000;

        this.trashY = new Image();
        this.trashY.src = "src/trashY.png";

        this.trashR = new Image();
        this.trashR.src = "src/trashR.png";

        this.imgs = [this.trashR, this.trashY];
    }
    
    spawnBlocks(currentTime) {

        this.spawnRate = Math.random() * 10000 + 1000;
        if (currentTime > (this.lastSpawn + this.spawnRate)) {
            this.lastSpawn = currentTime;

            let color = Math.round(Math.random());
            const additional = Math.random();

            const block = new Block(1000, 485, this.imgs[color], 50, 50);
            this.blocks.push(block);

            if (additional > 0.7) {
                color = Math.round(Math.random());
                const block2 = new Block(1060, 485, this.imgs[color], 50, 50);
                this.blocks.push(block2);
                color = Math.round(Math.random());
                const block3 = new Block(1030 , 485, this.imgs[color], 50, 50);
                this.blocks.push(block3);
            } else if (additional > 0.5) {
                color = Math.round(Math.random());
                const block3 = new Block(1050 , 485, this.imgs[color], 50, 50);
                this.blocks.push(block3);
            }
        }
    }

    blockMove(block) {
        block.x -= 5;    
    }

    collisionCheck(player, game) {

        this.blocks.forEach( block => {

            if (player.x + 50 < block.x + block.width &&
                player.x + player.width > block.x &&
                player.y < block.y + block.height &&
                player.y + player.height > block.y + 12) {
                    game.running = false;
            } 

            if (block.x == 100) {
                game.score++;
            }
        })
    }
    
    clearBlocks() {
        this.blocks = [];
    }

    drawTerrain(ctx) {
        let toRemove;
        const ground = new Image();
        ground.src = "src/ground.png";
        ctx.drawImage(ground, 0, 525, 1600, 75);

        this.blocks.forEach(this.blockMove);
        this.blocks.forEach(block => {

            ctx.drawImage(block.img, block.x, block.y, block.height, block.width);
            
            if (block.x < -50) {
                toRemove = this.blocks.indexOf(block);
                setTimeout( () => {
                    this.blocks.splice(toRemove, 1);
                }, 0);
            }
        })


}

}