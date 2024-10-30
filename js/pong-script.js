const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Game Settings
const gravity = 0;
const maxScore = 10;
const botAC = 0.1; // Adjusted AI speed

// Game Variables
let radius = 20;
let ballSize = 30;
let gameState = 1;

let xValue = canvas.width / 2;
let yValue = canvas.height / 2;

let enemySpeed;
let xSpeed = 5; // Reduced ball speed
let ySpeed = 4; // Reduced ball speed
let playerScore = 0;
let enemyScore = 0;
let xPlayer, yPlayer, wPlayer, hPlayer;
let xEnemy, yEnemy, wEnemy, hEnemy;

let start = true;
let mouseY = canvas.height / 2; // Initial mouse position

// Setup
function setup() {
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    document.addEventListener("mousemove", (event) => {
        mouseY = event.clientY; // Update mouse position
    });
    document.addEventListener("keydown", keyPressed);
    canvas.width = window.innerWidth; // Initialize canvas size
    canvas.height = window.innerHeight; // Initialize canvas size
    gameLoop();
}

// Game Loop
function gameLoop() {
    if (start) {
        startScreen();
    } else {
        if (gameState === 1) {
            gameScreen();
        }
        endScreen();
    }
    requestAnimationFrame(gameLoop);
}

// Start Screen
function startScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "80px Arial";
    const offset = ctx.measureText("PONG").width / 2;
    ctx.fillText("PONG", (canvas.width / 2) - offset, 480);
    ctx.font = "20px Arial";
    const offset2 = ctx.measureText("Press Space to Start").width / 2;
    ctx.fillText("Press Space to Start", (canvas.width / 2) - offset2, 590);
}

// Game Screen
function gameScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "white";
    ctx.font = "90px Arial";
    ctx.fillText(enemyScore, canvas.width / 2 - 100, 100);
    ctx.fillText(playerScore, canvas.width / 2 + 100, 100);
    
    player1();
    enemyPlayer();
    ball();
}

// End Screen
function endScreen() {
    if (playerScore === maxScore || enemyScore === maxScore) {
        ctx.fillStyle = "rgba(0, 255, 10, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "90px Arial";
        const offset3 = ctx.measureText("Winner").width / 2;
        ctx.fillText("Winner", (canvas.width / 2) - offset3, 500);
        ctx.font = "20px Arial";
        const offset5 = ctx.measureText("Press Space to Continue").width / 2;
        ctx.fillText("Press Space to Continue", (canvas.width / 2) - offset5, 590);
        
        if (enemyScore === maxScore) {
            ctx.fillStyle = "rgba(255, 10, 0, 0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "90px Arial";
            const offset4 = ctx.measureText("Defeated").width / 2;
            ctx.fillText("Defeated", (canvas.width / 2) - offset4, 500);
            ctx.font = "20px Arial";
            ctx.fillText("Press Space to Continue", (canvas.width / 2) - offset5, 590);
        }
        enemyScore = 0;
        playerScore = 0;
        gameState = 0;
    }
}

// Player 1
function player1() {
    ctx.fillStyle = "white";
    xPlayer = 20;
    yPlayer = mouseY - 75; // Center player paddle based on mouse position
    wPlayer = 30;
    hPlayer = 150;
    ctx.fillRect(xPlayer, yPlayer, wPlayer, hPlayer);
}

// Enemy Player
function enemyPlayer() {
    ctx.fillStyle = "white";
    xEnemy = canvas.width - 50;

    // Adjust the bot's movement with more randomness
    const strafeAmount = Math.random() * 30 - 15; // Random value between -15 and 15
    yEnemy = Math.max(Math.min(yValue - (45 * botAC) + strafeAmount, canvas.height - hEnemy), 0);

    wEnemy = 30;
    hEnemy = 150;
    ctx.fillRect(xEnemy, yEnemy, wEnemy, hEnemy);
}

// Ball
function ball() {
    ctx.fillStyle = "white";
    xValue += xSpeed;
    yValue += ySpeed;
    ctx.beginPath();
    ctx.arc(xValue, yValue, ballSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Ball Reset
    if (xValue > canvas.width) {
        xValue = canvas.width / 2;
        yValue = canvas.height / 2;
        xSpeed = 5; // Reset ball speed
        enemyScore++;
    } else if (xValue < 0) {
        xValue = canvas.width / 2;
        yValue = canvas.height / 2;
        xSpeed = 5; // Reset ball speed
        playerScore++;
    }

    // Ball Collision
    if (xValue > xEnemy && xValue < xEnemy + wEnemy && yValue > yEnemy && yValue < yEnemy + hEnemy) {
        xSpeed = -xSpeed;
    } else if (xValue > xPlayer && xValue < xPlayer + wPlayer && yValue > yPlayer && yValue < yPlayer + hPlayer) {
        xSpeed = -xSpeed;
    }

    // Ball Bouncing
    if (yValue > canvas.height || yValue < 0) {
        ySpeed = -ySpeed;
    }

    ySpeed += gravity;
}

// Key Press
function keyPressed(event) {
    if (event.code === "Space") {
        start = false;
        gameState = 1;
    }
}

// Initialize the game
setup();
