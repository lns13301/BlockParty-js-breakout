var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var ballSpeed = 9;
var lifeInterval = 15;
var dx = ballSpeed;
var dy = -ballSpeed;
var numPositionX;
var numPositionY;
var paddleHeight = 10;
var paddleWidth = 130;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var aPressed = false;
var brickRowCount = 28;
var brickColumnCount = 12;
var brickWidth = 51;
var brickHeight = 25;
var brickPadding = 0;
var brickOffsetTop = 60;
var brickOffsetLeft = 0;
var score = 0;
var lives = 3;
var combo;
var moveStar = 0;
var breakBrick = 0;
var itemPosX = 0;
var itemPosY = 0;
var getItemStatus = 0;
var starLength = 0;
var itemUse = 0;
var equipItem = 0;
var randomValue = 0;
var minBallLocationX;
var maxBallLocationX;
var minBallLocationY;
var maxBallLocationY;
var autoPaddle;

var imgBackground = new Image();
imgBackground.src = "img/background2.png";
imgBackground.addEventListener("load", drawBackground, false);

var imgPieces = new Image();
imgPieces.src = "img/breakout_pieces.png";
imgPieces.addEventListener("load", drawPaddle,false);

var imgCustom = new Image();
imgCustom.src = "img/breakout_custom.png";
imgPieces.addEventListener("load", summonItem,false);

var imgBallPokeball = new Image();
imgBallPokeball.src = "img/pokeball.png";
imgBallPokeball.addEventListener("load", drawBall, false);

var imgNum = [];
imgNum.push({"img":imgPieces, "sx":304, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":311, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":316, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":322, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":328, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":334, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":340, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":304, "sy":57, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":310, "sy":57, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":316, "sy":57, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, itemBrick: 1};
    }
} // 변수에 지정해둔 벽돌의 행렬 값을 통해 벽돌 행렬을 구현

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("load", drawBall, false);

function keyDownHandler(e) {
    console.log(e.key);
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key === "a" || e.key === "a") {
        if(aPressed) aPressed = false;
        else aPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }

}
// 마우스의 눌러짐을 감지하여 true, false로 값을 변경해주는 부분

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status === 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    breakBrick++;
                    if(b.status === 0)
                        b.itemBrick = 2;
                    if(equipItem > 1 && b.itemBrick === 2 && itemUse > 0){
                        minBallLocationX = Math.floor(x / 51) - 1;
                        minBallLocationY = Math.floor((y - 60) / 25) - 1;
                        maxBallLocationX = minBallLocationX + 3;
                        maxBallLocationY = minBallLocationY + 3;
                        if(minBallLocationX < 0)
                            minBallLocationX = 0;
                        if(maxBallLocationX > brickRowCount)
                            maxBallLocationX = brickRowCount;
                        if(minBallLocationY < 0)
                            minBallLocationY = 0;
                        if(maxBallLocationY > brickColumnCount)
                            maxBallLocationY = brickColumnCount;
                        if(equipItem === 2){
                            for(var lineX = minBallLocationX; lineX < maxBallLocationX; lineX++){
                                bricks[c][lineX].status = 0;
                                score++;
                            }
                            for(var lineY = minBallLocationY; lineY < maxBallLocationY; lineY++){
                                bricks[lineY][r].status = 0;
                                score++;
                            }
                        } // explosionBall Event
                        itemUse--;
                    }
                    b.itembrick = 0;
                    score++;
                    if(dx + dy > 25)
                        score++;
                    if(dx + dy > 40)
                        score++;
                    if(dx + dy > 50)
                        score++;
                    if(dx + dy > 70)
                        score += 3;
                    if(score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
} // 공과 벽돌의 충돌을 감지하고 벽돌을 부수며 모든 벽돌이 파괴되었을 경우 클리어 문구를 출력하는 부분

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(imgPieces, 84, 136, 8, 8, x - 10, y - 10, 21, 21);
    //ctx.drawImage(imgBallPokeball, x - 13, y - 12, 22, 22);
    /*ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();*/
    ctx.closePath();
} // 벽돌을 부숴줄 공을 생성

function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(imgPieces, 144, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
    /*    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();*/
    ctx.closePath();
} // 튕겨져나온 공을 받아칠 패들을 생성

function drawBackground() {
    ctx.beginPath();
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 8, 32, 16, brickX, brickY - 12, 54, 24);
                /* ctx.rect(brickX, brickY, brickWidth, brickHeight);
                 ctx.fillStyle = "#0095DD";
                 ctx.fill();*/
                ctx.closePath();
            }
        }
    }
} // 앞서 만들어둔 벽돌 행렬을 토대로 벽돌을 그려냄

function drawScore() {
    ctx.drawImage(imgPieces, 328, 26, 5, 8, canvas.width * 0.02, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 316, 8, 5, 8, canvas.width * 0.03, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 304, 26, 5, 8, canvas.width * 0.04, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 322, 26, 5, 8, canvas.width * 0.05, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 328, 8, 5, 8, canvas.width * 0.06, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 323, 57, 5, 8, canvas.width * 0.07, lifeInterval, 12, 21);
    imgNumDraw(score % 10, canvas.width * 0.14, lifeInterval);
    if(score >= 10)
        imgNumDraw(Math.floor(score / 10 % 10), canvas.width * 0.13, lifeInterval);
    if(score >= 100)
        imgNumDraw(Math.floor(score / 100 % 10), canvas.width * 0.12, lifeInterval);
    if(score >= 1000)
        imgNumDraw(Math.floor(score / 1000 % 10), canvas.width * 0.11, lifeInterval);
    if(score >= 10000)
        imgNumDraw(Math.floor(score / 10000 % 10), canvas.width * 0.10, lifeInterval);
    if(score >= 100000)
        imgNumDraw(Math.floor(score / 100000 % 10), canvas.width * 0.09, lifeInterval);
    if(score >= 1000000)
        imgNumDraw(Math.floor(score / 1000000 % 10), canvas.width * 0.08, lifeInterval);
    /*ctx.font = "16px Arial";
    ctx.fillStyle = "#dd0091";
    ctx.fillText("Score: "+score, 8, 20);*/
} // 화면에 벽돌을 파괴해서 얻은 점수를 표시

function drawItem(){
    ctx.drawImage(imgPieces, 310, 17, 5, 8, canvas.width * 0.463, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 334, 26, 5, 8, canvas.width * 0.47, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 328, 8, 5, 8, canvas.width * 0.48, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 334, 17, 5, 8, canvas.width * 0.49, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 323, 57, 5, 8, canvas.width * 0.50, lifeInterval, 12, 21);
    imgNumDraw(itemUse % 10, canvas.width * 0.52, lifeInterval);
    if(itemUse >= 10)
        imgNumDraw(Math.floor(itemUse / 10 % 10), canvas.width * 0.51, lifeInterval);
}

function drawLives() {
    ctx.drawImage(imgPieces, 328, 17, 5, 8, canvas.width * 0.82, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 311, 17, 5, 8, canvas.width * 0.832, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 334, 8, 5, 8, canvas.width * 0.84, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 328, 8, 5, 8, canvas.width * 0.85, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 323, 57, 5, 8, canvas.width * 0.86, lifeInterval, 12, 21);

    if(lives > 0)
        ctx.drawImage(imgPieces, 120, 135, 9, 8, canvas.width * 0.88, lifeInterval, 36, 24);
    if(lives > 1)
        ctx.drawImage(imgPieces, 120, 135, 9, 8, canvas.width * 0.90, lifeInterval, 36, 24);
    if(lives > 2)
        ctx.drawImage(imgPieces, 120, 135, 9, 8, canvas.width * 0.92, lifeInterval, 36, 24);
    if(lives > 3)
        ctx.drawImage(imgPieces, 120, 135, 9, 8, canvas.width * 0.94, lifeInterval, 36, 24);
    if(lives > 4)
        ctx.drawImage(imgPieces, 120, 135, 9, 8, canvas.width * 0.96, lifeInterval, 36, 24);
    if(lives > 5){
        lives = 5;
    }
    /*ctx.font = "16px Arial";
    ctx.fillStyle = "#dd00aa";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);*/
} // 화면에 플레이어의 남은 목숨의 수를 표시

function draw() {
    ctx.clearRect(200, 0, canvas.width, canvas.height);
    drawBackground();
    drawStar();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawItem();
    drawLives();
    collisionDetection();
    summonItem();
    if(getItemStatus > 0){
        dropItem();
    }
    autoItem();
    longPaddleItem();
    ballImage();
    autoMode();
    // 앞서 생성한 함수들을 호출

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        dx *= 1.1;
        // 튕긴 후 속도
    }
    if(y + dy < ballRadius) {
        dy = -dy;
        dx *= 1.1;
        // 튕긴 후 속도
    }
    // 공이 벽을 닿으면 반대방향으로 이동하도록 좌표를 수정
    else if(y + dy > canvas.height-ballRadius - 6) {
        if(x > paddleX && x < paddleX + paddleWidth + 16) {
            if(paddleWidth / (x - paddleX) >= 20){
                dx = -ballSpeed;
                dx = dx * 1.5;
                dy = dy / 1.45;
            }
            if(paddleWidth / (x - paddleX) < 20 && paddleWidth / (x - paddleX) >= 6.66){
                dx = -ballSpeed;
                dx = dx * 1.3;
                dy = dy / 1.25;
            }
            if(paddleWidth / (x - paddleX) < 6.66 && paddleWidth / (x - paddleX) >= 3.33){
                dx = -ballSpeed;
                dx = dx * 1.15;
                dy = dy / 1.13;
            }
            if(paddleWidth / (x - paddleX) < 3.33 && paddleWidth / (x - paddleX) >= 2.5){
                dx = -ballSpeed;
                dx = dx * 1.08;
                dy = dy / 1.08;
            }
            if(paddleWidth / (x - paddleX) < 2.7  && paddleWidth / (x - paddleX) >= 1.62){
                dx = 1.03;
                dy = dy * 1.1;
            }
            if(paddleWidth / (x - paddleX) < 1.55  && paddleWidth / (x - paddleX) >= 1.42){
                dx = ballSpeed;
                dx = dx * 1.08;
                dy = dy / 1.08;
            }
            if(paddleWidth / (x - paddleX) < 1.42  && paddleWidth / (x - paddleX) >= 1.17){
                dx = ballSpeed;
                dx = dx * 1.15;
                dy = dy / 1.13;
            }
            if(paddleWidth / (x - paddleX) < 1.17  && paddleWidth / (x - paddleX) >= 1.05){
                dx = ballSpeed;
                dx = dx * 1.3;
                dy = dy / 1.25;
            }
            if(paddleWidth / (x - paddleX) < 1.05 && paddleWidth / (x - paddleX) >= 1){
                dx = ballSpeed;
                dx = dx * 1.5;
                dy = dy / 1.45;
            }
            dy = -dy;
            combo = 0;
            dx *= 1.04;
            dy *= 1.04;
            // 튕긴 후 속도
        }
        else {
            lives--;
            if(!lives) {
                draw();
                setTimeout(function() {
                    alert("GAME OVER");
                    document.location.reload()
                }, 1);
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = ballSpeed;
                dy = -ballSpeed;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    // 공이 바닥에 닿으면 게임오버
    /*if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }*/ // 키보드 입력으로 패들을 움직일 경우 패들의 속도를 지정하는 부분

    if(paddleX < 0) {
        paddleX += 5;
    }
    else if(paddleX + paddleWidth > canvas.width) {
        paddleX -= 5;
    }

    if(rightPressed) {
        paddleX += 5;
    }
    else if(leftPressed) {
        paddleX -= 5;
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }


    x += dx;
    y += dy;
    requestAnimationFrame(draw); // 고정 프레임 속도보다 게임을 더 잘 렌더링 할 수 있도록 설정
}

draw(); // draw 함수를 실행하여 실제 게임이 동작 되도록 함



function imgNumDraw(i, numPositionX, numPositionY){
    ctx.drawImage(imgNum[i].img, imgNum[i].sx, imgNum[i].sy, imgNum[i].sw, imgNum[i].sh, numPositionX, numPositionY, imgNum[i].dw, imgNum[i].dh);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function drawStar() {
    ctx.beginPath();
    for(var i = 0; i < moveStar; i++){
        if(moveStar > 80 && moveStar < 200){
            starLength = i - 100;
            ctx.arc(840, 420 + starLength, 2, 0, Math.PI * 2);
        }
        if (moveStar > 210 && moveStar < 300){
            starLength = i - 150;
            ctx.arc(290, 140 + starLength, 2, 0, Math.PI * 2);
        }
        if (moveStar > 310 && moveStar < 450) {
            starLength = i - 200;
            ctx.arc(980, 590 + starLength, 2, 0, Math.PI * 2);
        }
        if (moveStar > 460 && moveStar < 540){
            starLength = i - 250;
            ctx.arc(700, 460 + starLength, 2, 0, Math.PI * 2);
        }
        if (moveStar > 550 && moveStar < 600) {
            starLength = i - 300;
            ctx.arc(530, 450 + starLength, 2, 0, Math.PI * 2);
        }
    }
    moveStar++;
    if(moveStar > 800)
        moveStar = 0;
    ctx.fillStyle = "#d3ffff";
    ctx.fill();
    ctx.closePath();
}

function summonItem() {
    if(breakBrick > 0 && itemPosY === 0 && itemUse < 1){
        if(getRandomInt(1, 1000) < 250){
            randomValue = getRandomInt(1, 1000);
            if(randomValue > 1 && randomValue <= 100)
                getItemStatus = 1;
            else if(randomValue > 100 && randomValue <= 350)
                getItemStatus = 2;
            else if(randomValue > 350 && randomValue <= 500)
                getItemStatus = 3;
            else if(randomValue > 500 && randomValue <= 700)
                getItemStatus = 4;
            else if(randomValue > 750 && randomValue <= 1000)
                getItemStatus = 5;
        }
        breakBrick = 0;
    }
}

function dropItem() {
    if(itemPosX === 0 && itemPosY === 0){
        itemPosX = x;
        itemPosY = y - 30;
    }
    itemPosY += 3;
    if(getItemStatus === 1){
        ctx.drawImage(imgCustom, 32, 0, 15, 15, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            lives++;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 2){
        ctx.drawImage(imgCustom, 0, 0, 15, 15, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            equipItem = 2;
            itemUse = 6;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 3){
        ctx.drawImage(imgCustom, 48, 0, 15, 15, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            equipItem = 3;
            itemUse = 12;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 4){
        ctx.drawImage(imgCustom, 16, 0, 15, 15, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            equipItem = 4;
            itemUse = 15;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 5){
        ctx.drawImage(imgCustom, 80, 0, 15, 15, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            dx = dx / 3 * 2;
            dy = dx / 3 * 2;
            getItemStatus = 0;
            itemPosY = 10000;
        }
    }
    if(itemPosY > canvas.height){
        itemPosX = 0;
        itemPosY = 0;
        getItemStatus = 0;
    }
    if(equipItem < 1)
        itemUse = 0;
}

function autoItem(){
    if(equipItem === 3 && itemUse > 0){
        if(y > canvas.height - 70)
            paddleX = x - getRandomInt(1 , paddleWidth);
    }
}

function longPaddleItem(){
    if(equipItem === 4 && itemUse > 0){
        paddleWidth = 260;
    }
    else paddleWidth = 130;
}

function ballImage(){
    if(itemUse > 0){
        if(getItemStatus === 2)
            ctx.drawImage(imgPieces, 66, 136, 8, 8, x - 11, y - 11, 23, 23);
    }
    if(equipItem === 3 && itemUse > 0){
        autoPaddle = getRandomInt(1,6);
        if(autoPaddle === 1)
            ctx.drawImage(imgPieces, 76, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
        if(autoPaddle === 2)
            ctx.drawImage(imgPieces, 8, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
        if(autoPaddle === 3)
            ctx.drawImage(imgPieces, 212, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
        if(autoPaddle === 4)
            ctx.drawImage(imgPieces, 8, 175, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
        if(autoPaddle === 5)
            ctx.drawImage(imgPieces, 76, 175, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
        if(autoPaddle === 6)
            ctx.drawImage(imgPieces, 144, 175, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
    }
}

function autoMode(){
    if(aPressed){
        if(y > canvas.height - 40)
            paddleX = x - getRandomInt(1 , paddleWidth);
        if(itemPosY > canvas.height - 40 && itemPosY < canvas.height)
            paddleX = itemPosX - getRandomInt(1 , paddleWidth);
        ctx.drawImage(imgPieces, 304, 8, 5, 8, canvas.width * 0.02, canvas.height - 3 * lifeInterval, 18, 31.5);
        ctx.drawImage(imgPieces, 340, 26, 5, 8, canvas.width * 0.035, canvas.height - 3 * lifeInterval, 18, 31.5);
        ctx.drawImage(imgPieces, 334, 26, 5, 8, canvas.width * 0.05, canvas.height - 3 * lifeInterval, 18, 31.5);
        ctx.drawImage(imgPieces, 304, 26, 5, 8, canvas.width * 0.065, canvas.height - 3 * lifeInterval, 18, 31.5);
    }
}

canvas.addEventListener('click',(arg)=>{
    console.log("x = " + x);
    console.log("y = " + y);
});