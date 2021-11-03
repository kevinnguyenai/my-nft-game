/** Connect to Moralis server */
const serverUrl = "https://arersre3azvg.usemoralis.com:2053/server";
const appId = "CFlv7rj6lvUyESaBazWBwl7tiwjtjkfRYDoQB1xs";

Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Hello , This simple game demo using moralis" })
            console.log(user)
            console.log(user.get('ethAddress'))
            await launch();
        } catch (error) {
            console.log(error)
        }
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    location.reload();
}


document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

/** Useful Resources  */

// https://docs.moralis.io/moralis-server/users/crypto-login
// https://docs.moralis.io/moralis-server/getting-started/quick-start#user
// https://docs.moralis.io/moralis-server/users/crypto-login#metamask

/** Moralis Forum */

// https://forum.moralis.io/

/** Phaser code */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game;
var platforms;
var untouchables;
var player;
var cursors;
var sound;

async function launch() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("PLEASE LOGIN");
    } else {
        console.log(user.get("ethAddress"));
        game = await new Phaser.Game(config);
    }
}

function preload() {
    this.load.image('background', './assets/png/BG.png');
    this.load.image('ground_left', './assets/png/Tiles/Tile (16).png');
    this.load.image('ground_right', './assets/png/Tiles/Tile (14).png');
    this.load.image('ground_mid', './assets/png/Tiles/Tile (15).png');
    this.load.image('bone_skull', './assets/png/Tiles/Bones (2).png');
    this.load.image('tomb_stone', './assets/png/Objects/TombStone (2).png');
    this.load.image('player', './assets/png/Character/spartan_1.png');
    this.load.audio('background_music', './assets/sound/drone-9708.mp3')
}

function create() {
    this.add.image(400, 300, 'background').setScale(0.55);
    // Add a physics flatform group
    platforms = this.physics.add.staticGroup();
    untouchables = this.physics.add.staticGroup();

    // Add Static object
    // cliff 1
    platforms.create(660, 400, 'ground_left').setScale(0.5).refreshBody();
    platforms.create(600, 400, 'ground_mid').setScale(0.5).refreshBody();
    platforms.create(536, 400, 'ground_mid').setScale(0.5).refreshBody();
    platforms.create(472, 400, 'ground_right').setScale(0.5).refreshBody();
    platforms.create(535, 400, 'bone_skull').setScale(0.25).refreshBody();
    untouchables.create(630, 355, 'tomb_stone').setScale(0.35).refreshBody();
    // cliff 2
    platforms.create(320, 335, 'ground_left').setScale(0.5).refreshBody();
    platforms.create(260, 335, 'ground_mid').setScale(0.5).refreshBody();
    platforms.create(196, 335, 'ground_mid').setScale(0.5).refreshBody();
    platforms.create(132, 335, 'ground_mid').setScale(0.5).refreshBody();
    platforms.create(73, 335, 'ground_right').setScale(0.5).refreshBody();

    // Add Dynamic object
    player = this.physics.add.sprite(500, 300, 'player').setScale(0.25).refreshBody();
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    sound = this.sound.add('background_music');
    sound.play();


}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        //player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        //player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        //player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-200);
    }
}