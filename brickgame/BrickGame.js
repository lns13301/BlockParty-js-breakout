var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 65;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var imgBackground = new Image();
imgBackground.src = "img/background2.png";
imgBackground.addEventListener("load", drawBackground, false);

var imgPieces = new Image();
imgPieces.src = "img/breakout_pieces.png";
imgPieces.addEventListener("load", drawPaddle,false);

var imgBallPokeball = new Image();
imgBallPokeball.src = "img/pokeball.png";
imgBallPokeball.addEventListener("load", drawBall, false);

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
} // 변수에 지정해둔 벽돌의 행렬 값을 통해 벽돌 행렬을 구현

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("load", drawBall, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
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
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
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
    ctx.drawImage(imgPieces, 48, 136, 8, 8, x - 10, y - 10, 21, 21);
    //ctx.drawImage(imgBallPokeball, x - 13, y - 12, 22, 22);
    /*ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();*/
    ctx.closePath();
} // 벽돌을 부숴줄 공을 생성

function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(imgPieces, 8, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64, 19);
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
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 8, 32, 16, brickX, brickY - 12, 72, 24);
               /* ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();*/
                ctx.closePath();
            }
        }
    }
} // 앞서 만들어둔 벽돌 행렬을 토대로 벽돌을 그려냄

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#dd0091";
    ctx.fillText("Score: "+score, 8, 20);
} // 화면에 벽돌을 파괴해서 얻은 점수를 표시

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#dd00aa";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
} // 화면에 플레이어의 남은 목숨의 수를 표시

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    // 앞서 생성한 함수들을 호출

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    // 공이 벽을 닿으면 반대방향으로 이동하도록 좌표를 수정
    else if(y + dy > canvas.height-ballRadius - 10) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
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