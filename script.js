document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const box = 20;
    const canvasSize = canvas.width;
    const totalBoxes = canvasSize / box;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let direction = 'RIGHT';
    let food = {
        x: Math.floor(Math.random() * totalBoxes) * box,
        y: Math.floor(Math.random() * totalBoxes) * box
    };
    let score = 0;

    document.addEventListener('keydown', changeDirection);

    function changeDirection(event) {
        if (event.keyCode === 37 && direction !== 'RIGHT') {
            direction = 'LEFT';
        } else if (event.keyCode === 38 && direction !== 'DOWN') {
            direction = 'UP';
        } else if (event.keyCode === 39 && direction !== 'LEFT') {
            direction = 'RIGHT';
        } else if (event.keyCode === 40 && direction !== 'UP') {
            direction = 'DOWN';
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'green' : 'white';
            ctx.strokeStyle = 'red';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === 'LEFT') snakeX -= box;
        if (direction === 'UP') snakeY -= box;
        if (direction === 'RIGHT') snakeX += box;
        if (direction === 'DOWN') snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * totalBoxes) * box,
                y: Math.floor(Math.random() * totalBoxes) * box
            };
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
            clearInterval(game);
            alert('Game Over');
        }

        snake.unshift(newHead);
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    let game = setInterval(draw, 500);
});

function mudarCor(){
    var paragrafo = document.getElementById('olamundo');
    paragrafo.style.color='green';
    paragrafo.innerHTML='Olá Mundo';
}









