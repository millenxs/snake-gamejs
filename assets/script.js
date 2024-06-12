const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const card = document.getElementById('romanticCard');
const gameOverCard = document.getElementById('gameOverCard');
const cardContent = document.getElementById('cardContent');

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = getRandomFoodPosition();
let gameRunning = true;

function generateRainbowColors(length) {
    const rainbowColors = [
        { r: 255, g: 0, b: 0 },    // Red
        { r: 255, g: 127, b: 0 },  // Orange
        { r: 255, g: 255, b: 0 },  // Yellow
        { r: 0, g: 255, b: 0 },    // Green
        { r: 0, g: 0, b: 255 },    // Blue
        { r: 75, g: 0, b: 130 },   // Indigo
        { r: 148, g: 0, b: 211 }   // Violet
    ];

    let colors = [];
    for (let i = 0; i < length; i++) {
        let ratio = i / length;
        let colorIndex = Math.floor(ratio * (rainbowColors.length - 1));
        let nextColorIndex = colorIndex + 1;
        let colorRatio = (ratio * (rainbowColors.length - 1)) - colorIndex;

        let r = Math.round(rainbowColors[colorIndex].r * (1 - colorRatio) + rainbowColors[nextColorIndex % rainbowColors.length].r * colorRatio);
        let g = Math.round(rainbowColors[colorIndex].g * (1 - colorRatio) + rainbowColors[nextColorIndex % rainbowColors.length].g * colorRatio);
        let b = Math.round(rainbowColors[colorIndex].b * (1 - colorRatio) + rainbowColors[nextColorIndex % rainbowColors.length].b * colorRatio);

        colors.push(`rgba(${r}, ${g}, ${b}, ${1 - ratio})`);
    }
    return colors;
}

const romanticContents = [
    { type: 'text', content: 'Ninguém está torcendo mais por você do que a criança que você foi um dia.' },
    { type: 'text', content: 'Podemos recomeçar todos os dias.' },
    { type: 'text', content: 'Em primeiro lugar ame a sua própria pessoa.' },
    { type: 'text', content: 'Tem gente que daria tudo para encontrar alguém como você, não se desvalorize.' },
  { type: 'text', content: 'Você nunca está no lugar errado. As vezes você está no lugar certo, olhando as coisas do jeito errado.' },
    { type: 'text', content: 'Amor é quando você se sente amado sem precisar ouvir um eu te amo.' }
];

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (!gameRunning) return;

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        // Call gameLoop again
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    let colors = generateRainbowColors(snake.length);
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'red' : colors[index];
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        if (index === 0) {
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            ctx.fillText('❤️', segment.x, segment.y + gridSize - 4);
        }
    });
}

function advanceSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }

    if (didGameEnd()) {
        gameRunning = false;
        showGameOverCard();
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    }
    if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    }
    if (keyPressed === 39 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    }
    if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.font = '20px Arial';
    ctx.fillText('❤️', food.x, food.y + gridSize - 4);
}

function getRandomFoodPosition() {
    let foodX, foodY;
    while (true) {
        foodX = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
        foodY = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
        if (!snake.some(segment => segment.x === foodX && segment.y === foodY)) {
            break;
        }
    }
    return { x: foodX, y: foodY };
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function showRandomCard() {
    const randomContent = romanticContents[Math.floor(Math.random() * romanticContents.length)];
    cardContent.innerHTML = ''; // Clear previous content

    if (randomContent.type === 'text') {
        cardContent.innerText = randomContent.content;
    } else if (randomContent.type === 'video') {
        const video = document.createElement('video');
        video.src = randomContent.content;
        video.controls = true;
        cardContent.appendChild(video);
    } else if (randomContent.type === 'music') {
        const audio = document.createElement('audio');
        audio.src = randomContent.content;
        audio.controls = true;
        cardContent.appendChild(audio);
    } else if (randomContent.type === 'gif') {
        const img = document.createElement('img');
        img.src = randomContent.content;
        cardContent.appendChild(img);
    }

    card.classList.remove('hidden');
}

function closeCard() {
    card.classList.add('hidden');
}

function showGameOverCard() {
    gameOverCard.classList.remove('hidden');
}

function closeGameOverCard() {
    gameOverCard.classList.add('hidden');
}

function restartGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = getRandomFoodPosition();
    gameRunning = true;
    closeCard();
    closeGameOverCard();
    gameLoop();
}

// Start the game
gameLoop();
