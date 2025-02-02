// 获取 DOM 元素
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameScreen = document.getElementById('game-screen');
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');
const pauseButton = document.getElementById('pause-button');
const endButton = document.getElementById('end-button');
const restartButton = document.getElementById('restart-button');

// 游戏参数
const boardWidth = 500;
const boardHeight = 500;
const blockSize = 20;
const rows = boardHeight / blockSize;
const cols = boardWidth / blockSize;
let snake = [
    { x: Math.floor(cols / 2), y: Math.floor(rows / 2) }
];
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
};
let score = 0;
let gameInterval;
let isPaused = false;

// 设置画布大小
gameBoard.width = boardWidth;
gameBoard.height = boardHeight;
const ctx = gameBoard.getContext('2d');

// 开始游戏
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameInterval = setInterval(gameLoop, 100);
});

// 游戏循环
function gameLoop() {
    if (isPaused) return;
    // 清除画布
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    // 移动蛇
    moveSnake();

    // 检查碰撞
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('游戏结束！得分: ' + score);
        restartGame();
    }

    // 检查是否吃到食物
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        scoreElement.textContent = score;
        createFood();
    } else {
        snake.pop();
    }

    // 绘制蛇
    drawSnake();

    // 绘制食物
    drawFood();
}

// 移动蛇
function moveSnake() {
    let head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    snake.unshift(head);
}

// 检查碰撞
function checkCollision() {
    const head = snake[0];
    // 检查是否撞到墙壁
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        return true;
    }
    // 检查是否撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// 创建食物
function createFood() {
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
    // 确保食物不会出现在蛇的身上
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            createFood();
            break;
        }
    }
}

// 绘制蛇
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(block => {
        ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
    });
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

// 处理键盘事件
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction!== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction!== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction!== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction!== 'left') direction = 'right';
            break;
    }
});

// 处理按钮点击事件
upButton.addEventListener('click', () => {
    if (direction!== 'down') direction = 'up';
});
leftButton.addEventListener('click', () => {
    if (direction!== 'right') direction = 'left';
});
rightButton.addEventListener('click', () => {
    if (direction!== 'left') direction = 'right';
});
downButton.addEventListener('click', () => {
    if (direction!== 'up') direction = 'down';
});

// 暂停游戏
pauseButton.addEventListener('click', () => {
    isPaused =!isPaused;
    pauseButton.textContent = isPaused? '继续' : '暂停';
});

// 结束游戏
endButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    alert('游戏结束！得分: ' + score);
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';
    restartGame();
});

// 重新游戏
restartButton.addEventListener('click', () => {
    restartGame();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
    isPaused = false;
    pauseButton.textContent = '暂停';
});

function restartGame() {
    snake = [
        { x: Math.floor(cols / 2), y: Math.floor(rows / 2) }
    ];
    direction = 'right';
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
    score = 0;
    scoreElement.textContent = score;
}