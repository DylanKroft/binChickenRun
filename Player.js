export default class Player {

    constructor(sprites, x, y, dy, height, width) {
        this.sprites = sprites;
        this.currentSprite = sprites[0];
        this.spriteSwitch = 0;
        this.spriteNum = 0;

        this.x = x;
        this.y = y;
        this.dy = dy;
        this.xMove = 0;

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.isJumping = false;
        this.jumped = false;

        this.height = height;
        this.width = width;

        this.forwardBlock = false;
        this.backwardBlock = false;

        this.lastMoveLeft = true;
    }
 
    getKeyPressed(event) {

        let key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode) {
            case 39:
                return;
                this.moveRight = false;
                this.moveLeft = key_state;
                break;

            case 37:
                return;
                this.moveLeft = false;
                this.moveRight = key_state;
                break;

            case 32:
                this.moveUp = key_state;
                break;
        }
        this.move();

        if (event.type == "keyup" && this.jumped) {
            this.jumped = false;
        }
    }

    initialMove() {

        if (this.xMove < 60) {
            this.x += 2;
            this.xMove++;
        }

    }

    updateSprite() {
        this.spriteSwitch++;
        if (this.spriteSwitch == 6) {
            this.spriteNum++;
            this.spriteSwitch = 0;

            if (this.spriteNum == 5) {
                this.spriteNum = 1;  
            }
        }

        this.currentSprite = this.sprites[this.spriteNum];

    }


    move() {

        if (this.moveUp && !this.isJumping && !this.jumped) {
            this.dy =- 15;
            this.isJumping = true;
            this.jumped = true;
        }

        if (this.moveLeft) {
            if (this.x < 950 && this.moveLeft) {
                this.x += 3;
            } 
        }

        if (this.moveRight) {
                if (this.x > 0) {
                this.x -= 3;
            }
        }

        this.dy += 0.75;
        this.y += this.dy;
        this.dy *= 1;

        if (this.y > 535 - this.height) {
            this.isJumping = false;
            this.y = 535 - this.height;
            this.dy = 0;
        }
    }


    drawPlayer(ctx, canvas) {
        ctx.drawImage(this.currentSprite, this.x, this.y, this.height, this.width);
    }

}