class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");

        //for polling input
        this.aKey = null;
        this.dKey = null;

        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 400;
        this.bodyY = 350;

        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 25;

        this.leftHandX = this.bodyX - 105;
        this.leftHandY = this.bodyY + 40;
        
        this.rightHandX = this.bodyX + 105;
        this.rightHandY = this.bodyY + 40;

        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 30;

        this.leftEarX = this.bodyX - 80;
        this.leftEarY = this.bodyY - 65;

        this.rightEarX = this.bodyX + 80;
        this.rightEarY = this.bodyY - 65;

        this.leftLegX = this.bodyX - 60;
        this.leftLegY = this.bodyY + 90;

        this.rightLegX = this.bodyX + 60;
        this.rightLegY = this.bodyY + 90;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas (loads all assets at once)
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")

        //legs (2)
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_darkE.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_darkE.png");
        
        //body (1)
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueB.png");

        //mouth (1)
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouthE.png");
        my.sprite.fangs = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouthF.png");

        //hands (2)
        my.sprite.leftHand = this.add.sprite(this.leftHandX, this.leftHandY, "monsterParts", "arm_blueE.png");
        my.sprite.leftHand.flipX = true;
        my.sprite.rightHand = this.add.sprite(this.rightHandX, this.rightHandY, "monsterParts", "arm_blueE.png");

        //eyes (1)
        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_yellow.png");

        //head accessories (2)
        my.sprite.leftEar = this.add.sprite(this.leftEarX, this.leftEarY, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.leftEar.flipX = true;
        my.sprite.rightEar = this.add.sprite(this.rightEarX, this.rightEarY, "monsterParts", "detail_dark_horn_large.png");

        // Initally hide certain sprites
        my.sprite.fangs.visible = false;

        //for polling input
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Event input: fangs
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        fKey.on('down', (key, event) =>{
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        });

        //Event input: smile
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        sKey.on('down', (key, event) =>{
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        const VELOCITY = 5;

        //Polling input:
        //When 'A' is down (and only when A is down), the monster should move slowly to the left.
        if(this.aKey.isDown){
           my.sprite.body.x -= VELOCITY;
           my.sprite.leftLeg.x -= VELOCITY;
           my.sprite.rightLeg.x -= VELOCITY;
           my.sprite.smile.x -= VELOCITY;
           my.sprite.fangs.x -= VELOCITY;
           my.sprite.leftHand.x -= VELOCITY;
           my.sprite.rightHand.x -= VELOCITY;
           my.sprite.eye.x -= VELOCITY;
           my.sprite.leftEar.x -= VELOCITY;
           my.sprite.rightEar.x -= VELOCITY;
        }

        //When 'D' is down (and only when D is down), the monster should move slowly to the right.
        if(this.dKey.isDown){
            my.sprite.body.x += VELOCITY;
            my.sprite.leftLeg.x += VELOCITY;
            my.sprite.rightLeg.x += VELOCITY;
            my.sprite.smile.x += VELOCITY;
            my.sprite.fangs.x += VELOCITY;
            my.sprite.leftHand.x += VELOCITY;
            my.sprite.rightHand.x += VELOCITY;
            my.sprite.eye.x += VELOCITY;
            my.sprite.leftEar.x += VELOCITY;
            my.sprite.rightEar.x += VELOCITY;
         }
    }
}
