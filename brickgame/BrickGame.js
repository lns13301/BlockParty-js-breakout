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
var cursorX;
var cursorY;
var paddleHeight = 10;
var paddleWidth = 130;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var aPressed = false;
var brickRowCount = 20;
var brickColumnCount = 12;
var brickWidth = 60;
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
var minBallLocation2X;
var maxBallLocation2X;
var minBallLocation3X;
var autoPaddle;
var mouseClicked = 0;
var gameStateHome = 0;
var gameStateShop = 1;
var gameStateRound1 = 11;
var gameStateRound2 = 12;
var gameStateRound3 = 13;
var time = 0;
var explosionTimer = 0;

var gameState = gameStateHome;

var explosionArray = [];
for(var i = 0; i < 6; i++){
    explosionArray.push({ explosionTimer: 0, dx: 0, dy: 0, dw: 0, dh: 0, explosionOn: false });
} // 폭발탄 효과 배열

var imgPortal = [];
for(var i  = 0; i < 40; i ++){
    imgPortal[i] = new Image();
    imgPortal[i].src = "gif/portal/portal" + i + ".png";
}

var imgRaindrop = [];
for(var i  = 0; i < 29; i ++){
    imgRaindrop[i] = new Image();
    imgRaindrop[i].src = "gif/raindrop/raindrop" + i + ".png";
}

var imgDeadlyMoons = [];
for(var i  = 0; i < 23; i ++){
    imgDeadlyMoons[i] = new Image();
    imgDeadlyMoons[i].src = "gif/DeadlyMoon/deadlyMoon" + i + ".png";
}

var imgRaincity = [];
for(var i  = 0; i < 8; i ++){
    imgRaincity[i] = new Image();
    imgRaincity[i].src = "gif/raincity/raincity" + i + ".png";
}

var imgWaterdrop = [];
for(var i  = 0; i < 50; i ++){
    imgWaterdrop[i] = new Image();
    imgWaterdrop[i].src = "gif/waterdrop/waterdrop" + i + ".png";
}

var imgExplosion = [];
for(var i  = 0; i < 37; i ++){
    imgExplosion[i] = new Image();
    imgExplosion[i].src = "gif/explosion/explosion" + i + ".png";
}

var imgPieces = new Image();
imgPieces.src = "img/breakout_pieces.png";

var imgCustom = new Image();
imgCustom.src = "img/breakout_custom.png";
imgPieces.addEventListener("load", summonItem,false);

var imgBallPokeball = new Image();
imgBallPokeball.src = "img/pokeball.png";

var imgPlayButton = new Image();
imgPlayButton.src = "img/playButton.png";

var imgBreakout = new Image();
imgBreakout.src = "img/breakout.png";

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
    let d = 20;
    d +=  explosionTimer[0];


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
                        minBallLocationX = Math.floor(x / 60) - 2;
                        minBallLocationY = Math.floor((y - 60) / 25) - 2;
                        maxBallLocationX = minBallLocationX + 5;
                        maxBallLocationY = minBallLocationY + 5;
                        minBallLocation2X = Math.floor(x / 60) - 1;
                        maxBallLocation2X = minBallLocationX + 4;
                        if(minBallLocationX < 0)
                            minBallLocationX = 0;
                        if(minBallLocation2X < 0)
                            minBallLocationX = 0;
                        if(maxBallLocationX > brickRowCount)
                            maxBallLocationX = brickRowCount;
                        if(maxBallLocation2X > brickRowCount)
                            maxBallLocation2X = brickRowCount;
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
                            for(var lineX = minBallLocation2X; lineX < minBallLocation2X; lineX++){
                                bricks[maxBallLocationY - 1][lineX].status = 0;
                                score++;
                            }
                            if(minBallLocationY <= maxBallLocationY){
                                for(var lineX = minBallLocation2X; lineX < maxBallLocation2X; lineX++){
                                    if(minBallLocation2X > 1){
                                        bricks[minBallLocationY + 1][lineX].status = 0;
                                        score++;
                                    }
                                }
                            }
                        }
                        if(equipItem === 2 && itemUse > 0){
                            explosionArray[itemUse - 1].explosionOn = true;
                            explosionArray[itemUse - 1].explosionTimer = 37;

                            explosionArray[itemUse - 1].dx =  x - 100;
                            explosionArray[itemUse - 1].dy =  y - 100;
                            explosionArray[itemUse - 1].dw = 200;
                            explosionArray[itemUse - 1].dh = 200;
                        }
                        //폭발 위치 지정
                        itemUse--;
                    }
                    b.itembrick = 0;
                    score++;
                    if(dx > 13 || dy > 13 || dx < -13 || dy < -13)
                        score++;
                    if(dx > 18 || dy > 18 || dx < -18 || dy < -18)
                        score++;
                    if(dx > 22 || dy > 22 || dx < -22 || dy < -22)
                        score++;
                    if(dx > 25 || dy > 25 || dx < -25 || dy < -25)
                        score++;
                    if(dx > 29 || dy > 29 || dx < -29 || dy < -29)
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

function drawWaterDrop(){
    ctx.beginPath();
    ctx.drawImage(imgWaterdrop[Math.floor(time / 3 ) % 49], 0, 0, 192, 192, 650, 650, 192, 192 );
    ctx.closePath();
}
function drawBackground1() {
    ctx.beginPath();
    ctx.drawImage(imgPlayButton, 0, 0, 800, 707, 600, 600, 300, 265 );
    ctx.closePath();
}

function drawBackground2() {
    ctx.beginPath();
    ctx.drawImage(imgRaindrop[Math.floor(time / 3 ) % 29], 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}
function animationHandler() {
    for (var i =0 ; i < 6; i++){
        if (explosionArray[i].explosionOn === true){ //폭발이벤트 발생시
            if (explosionArray[i].explosionTimer > 0) { //타이머가 0이상일 경우

                ctx.drawImage(
                    imgExplosion[explosionArray[i].explosionTimer % 37],
                    explosionArray[i].dx,
                    explosionArray[i].dy,
                    explosionArray[i].dw,
                    explosionArray[i].dh); //타이머 시간동안 재생

                explosionArray[i].explosionTimer -= 1; //타이머 감소

                if (explosionArray[i].explosionTimer === 0) // 0일경우 해당 폭발이 끝났으므로 상태를 false로 설정
                    explosionArray[i].explosionOn = false;
            }
        }
    }

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
                ctx.drawImage(imgPieces, 8, 8, 32, 16, brickX, brickY - 12, 63, 24);
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
    if(gameState === gameStateHome){
        ctx.drawImage(imgRaincity[Math.floor(time / 9) % 7], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgBreakout, 50, 50, 1054, 525);
        drawBackground1();
        if(cursorX > 600 && cursorX < 900 && cursorY > 600 && cursorY < 825){
            drawWaterDrop();
            if(mouseClicked === 1)
                gameState = gameStateRound1;
        }
        //ctx.drawImage(imgStartButton, 300, 300);
        //if(mouseClicked > 0 && cursorX =)
    }




    if(gameState > 10){
        if(gameState === gameStateRound1){
            drawBackground2();
            drawBricks();
            drawBall();
            drawPaddle();
            longPaddleItem();
            drawScore();
            drawItem();
            drawLives();
            collisionDetection();
            summonItem();
            if(getItemStatus > 0){
                dropItem();
            }
            autoItem();
            ballImage();
            autoMode();


            animationHandler(); //애니메이션

            if(equipItem === 2 && itemUse > 0)
                ctx.drawImage(imgPieces, 66, 136, 8, 8, x - 12, y - 12, 25, 25);
            // 앞서 생성한 함수들을 호출
        }
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
            dy *= 1.05;
            // 튕긴 후 속도
        }
        if(y + dy < ballRadius) {
            dy = -dy;
            dx *= 1.2;
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
    }
    if(gameState === gameStateShop){
        drawBackground2();
    }
    //drawStar();
    if(mouseClicked > 0)
        mouseClicked = 0;
    time++;
    if(dx > 0 && dx < 5)
        dx = 5;
    if(dx > -5 && dx < 0)
        dx = -5;
    if(dy > 0 && dy < 5)
        dy = 5;
    if(dy > -5 && dy < 0)
        dy = -5;
    if(dx > 30)
        dx = 30;
    if(dx < -30)
        dx = -30;
    if(dy > 30)
        dy = 30;
    if(dy < -30)
        dy = -30;
    // 공속도가 비정상적으로 느려지거나 빨라지면 일정속도로 설정
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
                getItemStatus = 2;
            else if(randomValue > 500 && randomValue <= 700)
                getItemStatus = 2;
            else if(randomValue > 750 && randomValue <= 1000)
                getItemStatus = 2;
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
            itemUse = 9;
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
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height && getItemStatus === 5){
            dx = dx * 0.7;
            dy = dx * 0.7;
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

document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

canvas.addEventListener('click',(arg)=>{
    console.log("x = " + x);
    console.log("y = " + y);
    mouseClicked++;
});


/*setInterval(checkCursor, 1000);
function checkCursor(){
    alert("Cursor at: " + cursorX + ", " + cursorY);
}*/