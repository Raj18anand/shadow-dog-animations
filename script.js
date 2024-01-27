let playerState = 'idle';

document.addEventListener('DOMContentLoaded', function() {

    const buttons = [
        {
            name: 'Idle',
            value:'idle'
        },
        {
            name: 'Jump',
            value: 'jump'
        },
        {
            name: 'Fall',
            value: 'fall'
        },
        {
            name: 'Run',
            value: 'run'
        },
        {
            name: 'Dizzy',
            value: 'dizzy'
        },
        {
            name: 'Sit',
            value: 'sit'
        },
        {
            name: 'Roll',
            value: 'roll'
        },
        {
            name: 'Bite',
            value: 'bite'
        },
        {
            name: 'KO',
            value: 'ko'
        },
        {
            name: 'Get Hit',
            value: 'gethit'
        }
    ];


    buttons.forEach((button, index) => {
        const buttonElement = document.getElementById(`button${index + 1}`);
        buttonElement.addEventListener('click', function() {
            buttonClickHandler(button);
        });
    });
});

function buttonClickHandler(button) {
    const { name, value } = button;
    playerState=value;
}



const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;


let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    }
];


animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);



function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();