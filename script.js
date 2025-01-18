const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('score-board');
let score = 0;
let gameInterval, zombieIntervalId;

const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
};

const zombies = [];
const zombieSpeed = 1;
const zombieInterval = 2000;

function drawPlayer() {
    ctx.fillStyle = '#00f';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawZombie(zombie) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function createZombie() {
    const x = Math.random() < 0.5 ? 0 : canvas.width - 30;
    const y = Math.random() * canvas.height;
    const zombie = { x, y, width: 30, height: 30 };
    zombies.push(zombie);
}

function moveZombies() {
    zombies.forEach((zombie, index) => {
        const angle = Math.atan2(player.y - zombie.y, player.x - zombie.x);
        zombie.x += Math.cos(angle) * zombieSpeed;
        zombie.y += Math.sin(angle) * zombieSpeed;
        if (
            zombie.x < player.x + player.width &&
            zombie.x + zombie.width > player.x &&
            zombie.y < player.y + player.height &&
            zombie.height + zombie.y > player.y
        ) {
            clearInterval(gameInterval);
            clearInterval(zombieIntervalId);
            alert('Game Over! Your score is ' + score + 'Rate The Project https://forms.gle/3p8RZ2XL3rBfemNS6');
            document.location.reload();
        }
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawPlayer();
    movePlayer();
    moveZombies();
    zombies.forEach(drawZombie);
    score++;
    scoreBoard.innerText = 'Score: ' + score;
}

function startGame() {
    gameInterval = setInterval(gameLoop, 1000 / 60);
    zombieIntervalId = setInterval(createZombie, zombieInterval);
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        player.dy = -3;
    } else if (event.key === 'ArrowDown') {
        player.dy = 3;
    } else if (event.key === 'ArrowLeft') {
        player.dx = -3;
    } else if (event.key === 'ArrowRight') {
        player.dx = 3;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player.dy = 0;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        player.dx = 0;
    }
});

// Start the game
startGame();
